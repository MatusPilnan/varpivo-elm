port module Main exposing (..)

import ApiFunctions exposing (..)
import Char exposing (isDigit)
import ConnectionsManagement exposing (brewSessionLink)
import Data.BFImport exposing (defaultBFImport)
import Menu exposing (menuDrawer)
import SnackbarTools exposing (simpleMessage, brewSessionKeyRejectedMessage)
import BottomToolbar exposing (bottomToolbar)
import Browser exposing (Document)
import Browser.Navigation as Navigation exposing (Key)
import Data.Step exposing (RecipeStep, StepKind(..))
import Dialog exposing (dialog, showDialog)
import Dict exposing (Dict)
import Duration exposing (Duration)
import Html exposing (Html)
import KegMessage exposing (handleKegMessage)
import Material.Typography as Typography
import Material.Snackbar as Snackbar
import Bootstrap.Grid as Grid
import Bootstrap.Utilities.Spacing as Spacing
import Bootstrap.Grid.Row as Row
import Maybe exposing (withDefault)
import Messages exposing (..)
import Model exposing (Flags, Model, defaultSecurityFormState, getApiUrlsFromQueryString)
import Navbar exposing (navbar)
import Notification exposing (Notification)
import Page exposing (page)
import Data.Recipe exposing (BrewSessionData, RecipeListEntry)
import Router exposing (Route(..), navigate, route)
import Task
import Time exposing (Posix, Zone)
import Url exposing (Url)




-- MAIN


main = Browser.application
  { init = init
  , view = view
  , update = update
  , subscriptions = subscriptions
  , onUrlChange = UrlChanged
  , onUrlRequest = LinkClicked
  }

subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.batch [messageReceiver Recv, notificationClick (\path -> NavigateTo (path, [])), Time.every 1000 SetTime ]


-- PORTS


port sendMessage : String -> Cmd msg
port saveConnections : {connections: List String, selected: String} -> Cmd msg
port saveBrewSessionCode : String -> Cmd msg
port connect : String -> Cmd msg
port notification: Notification -> Cmd msg
port notificationClick: (List String -> msg) -> Sub msg
port console : String -> Cmd msg
port shareLink: String -> Cmd msg
port messageReceiver : (String -> msg) -> Sub msg


init : Flags -> Url -> Key -> ( Model, Cmd Msg )
init flags url key =
  let
    model =
      Model.init flags url key
  in
  ( model
  , Cmd.batch
    ( [ fetchBrewSession model.security.code flags.apiBaseUrl
      , Task.perform SetTimeZone Time.here
      , Task.perform SetTime Time.now
      ] ++ checkApiUrlsFromQueryString flags.apiDefaultProtocol url
    )
  )


-- UPDATE

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    SnackbarClosed messageId->
       ({model | snackbarQueue = Snackbar.close messageId model.snackbarQueue}, Cmd.none)
    Increment ->
      ({ model | value = model.value + 1}, Cmd.none)
    Decrement ->
      ({ model | value = model.value - 1, availableRecipes = List.drop 1 model.availableRecipes }, Cmd.none)
    FetchRecipes ->
      ({ model | loading = True}, fetchRecipes model.apiBaseUrl)
    SetAvailableRecipes list ->
      ({ model | value = model.value + 1, availableRecipes = list, loading = False, apiConnecting = False }, Cmd.none)
    Recv data ->
      handleKegMessage data model console notification
    Send ->
      ( model, Cmd.batch [notification {title = "Title", subtitle = "Subtitle", time = 6777}, sendMessage "msg"] )
    ShowDialog dialog ->
      ( { model | dialogVariant = Just dialog }, Cmd.none )
    CloseDialog afterClose ->
      case afterClose of
        Nothing ->
          ( { model | dialogVariant = Nothing }, Cmd.none )
        Just a ->
          update a { model | dialogVariant = Nothing }
    SelectRecipe recipe ->
      ( { model | loading = True, selectedRecipe = Just recipe} , fetchRecipeSteps recipe.id model.apiBaseUrl)
    SetSteps (recipeSteps, stepOrder) ->
      ( { model | recipeSteps = recipeSteps, stepsOrder = stepOrder,loading = False }, navigate model ["brew-session"] [])
    ShowSnackbar string ->
      ({model | snackbarQueue = (Snackbar.addMessage (simpleMessage string) model.snackbarQueue), loading = False }, Cmd.none)

    ShowRecipeDetail recipeListEntry ->
      ( { model | selectedRecipe = Just recipeListEntry}, navigate model ["recipe"] [])

    LinkClicked urlRequest ->
      case urlRequest of
        Browser.Internal url ->
          ( model, Cmd.batch [navigate model [url.path][], console (Debug.toString url)] ) -- TODO: query parametre

        Browser.External href ->
          ( model, Navigation.load href )

    UrlChanged url ->
      route url model console

    NavigateTo (path, query) ->
      ( {model | menuOpened = False}, navigate model path query)

    RequestTimeZone ->
      ( model, Task.perform SetTimeZone Time.here )

    SetTimeZone zone ->
      ( { model | timezone = Just zone}, Cmd.none)

    SetTime time ->
      ( { model | remainingBoilTime =
            case model.selectedRecipe of
                Nothing -> Nothing
                Just recipe -> case recipe.boil_time of
                    Nothing -> Nothing
                    Just boil_time-> case model.boilStartedAt of
                         Nothing -> Maybe.Just (Duration.minutes boil_time)
                         Just started -> Maybe.Just (Duration.from time (Time.millisToPosix ((Time.posixToMillis started) + round boil_time *60000)))
        }, Cmd.none )

    SetBrewSession brewSessionData ->
      let
        oldSecurity =
          model.security
        oldSecurityForm =
          oldSecurity.form
      in
      ( { model | selectedRecipe = brewSessionData.recipeListEntry
        , recipeSteps = brewSessionData.steps
        , stepsOrder = brewSessionData.stepIds
        , loading = False
        , boilStartedAt = Maybe.map Time.millisToPosix brewSessionData.boilStartedAt
        , security =
          { oldSecurity | valid = brewSessionData.brewSessionCodeValid
          , form = {oldSecurityForm | value = (if brewSessionData.brewSessionCodeValid then model.security.code else "")} }
        }
      , Cmd.batch
        [ navigate model ["brew-session"][]
        , if brewSessionData.brewSessionCodeValid then saveBrewSessionCode model.security.code else Cmd.none
        ]
      )

    StartStep stepId ->
      (model, startStep stepId model.security.code model.apiBaseUrl)

    UpdateStep step ->
      ( { model | recipeSteps = (Dict.insert step.id step model.recipeSteps)}, Cmd.none )

    FinishStep stepId ->
      ( model
      , case Dict.get stepId model.recipeSteps of
          Just step ->
            case (step.started, step.finished) of
              (Just _, Nothing) ->
                Cmd.batch [finishStep stepId model.security.code model.apiBaseUrl, navigate model [] []]
              (_, _) ->
                navigate model [] []

          Nothing ->
            navigate model [] []
      )

    MenuOpened ->
      ( { model | menuOpened = True}, Cmd.none)

    MenuClosed ->
      ( { model | menuOpened = False}, Cmd.none)

    CalibrationValueUpdate int ->
      ( { model | calibrationValue = int}, Cmd.none )

    StartCalibration ->
      ( model, if model.calibrationValue == -1 then Cmd.none else startCalibration model.calibrationValue model.security.code model.apiBaseUrl )

    CalibrationWeightPlaced ->
      ( model, calibrate model.security.code model.apiBaseUrl )

    TareScale ->
      ( model, tareScale model.security.code model.apiBaseUrl)

    CancelBrewSession ->
      ( model, Cmd.batch [cancelBrewSession model.security.code model.apiBaseUrl, fetchRecipes model.apiBaseUrl])

    Multiple msgs ->
      ( model, case List.unzip (List.map (\i -> update i model) (List.filter (\i -> case i of
                                                                Multiple _ ->
                                                                  False
                                                                _ ->
                                                                  True
                                                       ) msgs)) of
               (_, cmds) ->
                 Cmd.batch cmds
      )

    NewApiUrl string ->
      let
          address =
              prepareAddress model.apiDefaultProtocol string
      in
      case Url.fromString address of
        Just _ ->
          ( { model | newApiUrlFormError = Nothing, apiConnecting = True }, checkApiUrl address False )
        Nothing ->
          ( { model | newApiUrlFormError = Just "Please enter a valid address" }, console address )

    SelectApiUrl string ->
      ( { model | selectedApiUrl = Just string }, Cmd.none )

    SaveApiUrl (string, autoDetection) ->
      let
        storedApiUrls =
          if List.member string model.storedApiUrls then model.storedApiUrls else model.storedApiUrls ++ [ string ]
      in
      ( { model | newApiUrlFormError = Nothing
        , apiConnecting = False
        , apiBaseUrl = if model.apiBaseUrl == "" then string else (if autoDetection then model.apiBaseUrl else string)
        , loading = True
        , storedApiUrls = storedApiUrls
        }
      , Cmd.batch
        [ saveConnections {selected = string, connections = storedApiUrls }
        , fetchBrewSession model.security.code string
        , navigate model [""] []
        , connect (string ++ "/tap")
        ]
      )

    RemoveApiUrl string ->
      let
        storedApiUrls =
          List.filter (\url -> url /= string) model.storedApiUrls
      in
      ( { model | storedApiUrls = storedApiUrls }, saveConnections {selected = withDefault "" model.selectedApiUrl, connections = storedApiUrls } )

    RejectApiUrl (reason, autoCheckedUrl) ->
      ( { model | newApiUrlFormError = (if autoCheckedUrl then Nothing else Just reason ), apiConnecting = False }, console reason )

    BrewSessionCodeInput value ->
      let
        oldSecurity =
          model.security
        oldSecurityForm =
          oldSecurity.form
      in
      ( { model | security = { oldSecurity | form = { oldSecurityForm | value = String.toUpper value} } }, Cmd.none )

    BrewSessionCodeChange suggestedCode ->
      let
        oldSecurity =
          model.security
        oldSecurityForm =
          oldSecurity.form
      in
      ( { model | security = { oldSecurity | form = { oldSecurityForm | hint = "Checking..."} } }, verifyBrewSessionCode suggestedCode model.apiBaseUrl )

    BrewSessionCodeVerified newCode ->
      let
        oldSecurity =
          model.security
      in
      ( { model | security = { oldSecurity | form = { defaultSecurityFormState | value = newCode}, code = newCode, valid = True } }, saveBrewSessionCode newCode )

    BrewSessionCodeRejected (rejectionMessage, currentIsInvalid) ->
      let
        oldSecurity =
          model.security
        oldSecurityForm =
          oldSecurity.form
      in
      ( { model | security =
          { oldSecurity | form = { oldSecurityForm | error = rejectionMessage, valid = False}
          , valid = (if not currentIsInvalid then model.security.valid else False)
          }
        , snackbarQueue = (Snackbar.addMessage (brewSessionKeyRejectedMessage rejectionMessage) model.snackbarQueue)
        }, Cmd.none )

    CheckingUrlsFromQuery ->
      ( {model | apiConnecting = True}, Cmd.none )

    ToggleCodeSharing ->
      let
        oldSecurity =
          model.security
      in
      ( { model | security = { oldSecurity | shareSecurityCode = (not oldSecurity.shareSecurityCode)}}, Cmd.none )

    ShareLink ->
      ( if model.sharingSupported
        then model
        else { model | snackbarQueue = (Snackbar.addMessage (simpleMessage "Link copied.") model.snackbarQueue)}
      , shareLink <| brewSessionLink model )

    BFImportInput string ->
      let
        bfUrlCheck =
          String.startsWith (String.left (String.length string) "https://brewersfriend.com") string ||
          String.startsWith (String.left (String.length string) "http://brewersfriend.com") string ||
          String.startsWith (String.left (String.length string) "brewersfriend.com") string ||
          String.startsWith (String.left (String.length string) "https://www.brewersfriend.com") string ||
          String.startsWith (String.left (String.length string) "http://www.brewersfriend.com") string ||
          String.startsWith (String.left (String.length string) "www.brewersfriend.com") string
        oldImport =
          model.bfImport
        (valid, error, hint) =
          if String.length string >= 1
          then
            if String.all isDigit string
            then (True, "", "Entering Brewer's Friend ID")
            else
              if bfUrlCheck
              then (True, "", "Entering Brewer's Friend URL" )
              else (False, "Not a Brewer's Friend URL/ID", "")
          else (True, "", "Enter the ID or URL of your recipe from Brewer's Friend")
      in
      ( { model | bfImport = { oldImport | form = { value = string, valid = valid, error = error, hint = hint } } }, Cmd.none )

    ToggleRecipeReplace ->
      let
        oldImport = model.bfImport
      in
      ( { model | bfImport = { oldImport | replace = not oldImport.replace, add = False } }, Cmd.none )

    ToggleRecipeAdd ->
      let
        oldImport = model.bfImport
      in
      ( { model | bfImport = { oldImport | add = not oldImport.add, replace = False } }, Cmd.none )

    ImportRecipe idOrUrl ->
      let
        bfUrlCheck =
          String.startsWith  "https://brewersfriend.com" idOrUrl ||
          String.startsWith  "http://brewersfriend.com" idOrUrl ||
          String.startsWith  "brewersfriend.com" idOrUrl ||
          String.startsWith  "https://www.brewersfriend.com" idOrUrl ||
          String.startsWith  "http://www.brewersfriend.com" idOrUrl ||
          String.startsWith  "www.brewersfriend.com" idOrUrl ||
          String.all isDigit idOrUrl
        oldImport = model.bfImport
        (id, url) =
          if String.all isDigit idOrUrl
          then (Just idOrUrl, Nothing)
          else (Nothing, Just idOrUrl)
      in
      if bfUrlCheck
      then ({model | bfImport = { oldImport | importing = True } }, importBrewersFriend model.apiBaseUrl id url model.bfImport.replace model.bfImport.add)
      else ( {model | bfImport = { oldImport | form = { value = oldImport.form.value, valid = False, error = "Invalid input", hint = "" } } } , Cmd.none)

    ImportRecipeSuccess recipeListEntry ->
      ( { model
        | bfImport =
          { defaultBFImport
          | successMessage = "Recipe " ++ recipeListEntry.name ++ " imported successfully."
          , importing = False
          }
        , availableRecipes = model.availableRecipes ++ [ recipeListEntry ]
        }, Cmd.none )

    ImportRecipeFailure reason ->
      let
        oldImport = model.bfImport
      in
      ( { model | bfImport = { oldImport | errorMessage = reason, successMessage = "", importing = False } }, Cmd.none )


prepareAddress protocol address =
    String.dropRight 1 ( ( if String.startsWith "http://" address || String.startsWith "https://" address
    then address
    else protocol ++ address ) ++
    ( if String.endsWith "/api" address || String.endsWith "/" address
    then (if String.endsWith "/" address then "" else " ")
    else "/api/"))


checkApiUrlsFromQueryString : String -> Url -> List (Cmd Msg)
checkApiUrlsFromQueryString protocol url =
  let
    decodedUrls =
      getApiUrlsFromQueryString url
  in
  if List.isEmpty decodedUrls
  then [Cmd.none]
  else List.map (\address -> checkApiUrl (prepareAddress protocol address) True) decodedUrls


-- VIEW

view : Model -> Document Msg
view model =
  { title = model.title
  , body =
    [ Html.div []
      ( menuDrawer model ( not (Dict.isEmpty model.recipeSteps) ) ++
      [ Html.div [ Typography.typography ]
        [ navbar model.title (isRecipeSelected model) model.security.valid
        , showDialog model
        , Grid.container [ Spacing.py5 ]
          [ Grid.row [ Row.attrs [ Spacing.pt4 ] ]
            [ Grid.col []
              [ page model ]
            ]
          ]
        , Snackbar.snackbar
                  (Snackbar.config { onClosed = SnackbarClosed })
                  model.snackbarQueue
        , if not (Dict.isEmpty model.recipeSteps) then
            bottomToolbar model.temperature model.remainingBoilTime model.heating
          else Html.div [] []
        ]
      ])
    ]
  }


isRecipeSelected : Model -> Bool
isRecipeSelected model =
  case model.selectedRecipe of
    Just _ ->
      True
    Nothing ->
       False
