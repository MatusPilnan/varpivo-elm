port module Main exposing (..)

import Api exposing (send)
import Api.Data exposing (BrewSession, Recipe, RecipeList, StepsList)
import Api.Request.BrewSessionStatus as BrewStatusApi
import Api.Request.Info as InfoApi
import Api.Request.RecipeSteps as RecipeStepsApi
import Api.Request.Recipes as RecipesApi
import Api.Request.Scale as ScaleApi
import ConnectionsManagement exposing (brewSessionLink)
import Menu exposing (menuDrawer)
import SnackbarTools exposing (simpleMessage, brewSessionKeyRejectedMessage)
import BottomToolbar exposing (bottomToolbar)
import Browser exposing (Document)
import Browser.Navigation as Navigation exposing (Key)
import Data.Conversions exposing (apiRecipeToRecipe, apiStepListToStepList, apiStepToRecipeStep)
import Data.Step exposing (RecipeStep, StepKind(..))
import Dialog exposing (dialog, showDialog)
import Dict exposing (Dict)
import Duration exposing (Duration)
import Html exposing (Html)
import Http exposing (Error(..))
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
import Result
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


verifyBrewSessionCode : String -> String -> Cmd Msg
verifyBrewSessionCode brewSessionCode basePath =
  send
  ( \response ->
    case response of
      Ok _ ->
        BrewSessionCodeVerified brewSessionCode
      Err e ->
        case e of
          BadStatus code ->
            case code of
              401 ->
                BrewSessionCodeRejected ("Invalid code", False)
              _ ->
                BrewSessionCodeRejected ("Code couldn't be verified", False)
          _ ->
            BrewSessionCodeRejected ("Code couldn't be verified", False)

  ) (Api.withBasePath basePath (InfoApi.getAuth ( Just brewSessionCode ) ) )


checkApiUrl : String -> Bool -> Cmd Msg
checkApiUrl basePath autoCheck =
  send (\response -> case response of
                       Ok _ ->
                         SaveApiUrl (basePath, autoCheck)
                       Err e ->
                         case e of
                           BadStatus code ->
                             case code of
                               404 ->
                                 RejectApiUrl ("No Var:Pivo server found on that address", autoCheck)
                               _ ->
                                 RejectApiUrl ("Unknown error " ++ Debug.toString e, autoCheck)
                           NetworkError ->
                             RejectApiUrl ("Could not connect to that address", autoCheck)
                           _ ->
                             RejectApiUrl ("Unknown error " ++ Debug.toString e, autoCheck)

                      ) (Api.withBasePath basePath (InfoApi.getDiscover))

handleSteps: Result Http.Error StepsList -> (Dict String RecipeStep, List String)
handleSteps res = case res of
                Ok value ->
                  apiStepListToStepList value
                Err _ ->
                  (Dict.empty, [])

handleRecipes: Result Http.Error RecipeList -> List RecipeListEntry
handleRecipes res = case res of
                Ok value -> List.map apiRecipeToRecipe value.recipes
                Err _ -> []



fetchRecipeSteps: String -> String -> Cmd Msg
fetchRecipeSteps recipeId basePath = send ( \msg ->
  let
      (steps, order) =
          handleSteps msg
  in
    if Dict.isEmpty steps then
      ShowSnackbar "Couldn't get recipe steps!"
    else
      SetSteps (steps, order)) (Api.withBasePath basePath (RecipesApi.postRecipe recipeId))

fetchRecipes: String -> Cmd Msg
fetchRecipes basePath = send (\msg -> SetAvailableRecipes (handleRecipes msg)) (Api.withBasePath basePath RecipesApi.getRecipeList)


handleBrewSession: Result Http.Error BrewSession -> Maybe (BrewSessionData)
handleBrewSession response =
  case response of
    Ok value ->
      Just ( { recipeListEntry = Just (apiRecipeToRecipe value.recipe)
           , steps = Dict.fromList (List.map (\step -> (step.id, apiStepToRecipeStep step)) value.steps)
           , stepIds = List.map (\step -> step.id) value.steps
           , boilStartedAt = Maybe.map round value.boilStartedAt
           , brewSessionCodeValid = value.bsCodeValid
           })
    Err _ ->
      Nothing


fetchBrewSession brewSessionCode basePath =
  send (\response -> case (handleBrewSession response) of
                       Nothing ->
                         FetchRecipes
                       Just result ->
                         SetBrewSession result
                     ) (Api.withBasePath basePath (BrewStatusApi.getBrewStatus (Just brewSessionCode)))

cancelBrewSession brewSessionCode basePath =
  send (\response -> case response of
                              Ok _ ->
                                SetBrewSession ({ recipeListEntry = Nothing
                                                , steps = Dict.empty
                                                , stepIds = []
                                                , boilStartedAt = Nothing
                                                , brewSessionCodeValid = True
                                                })
                              Err e ->
                                handleApiError e
                            ) (Api.withBasePath basePath (BrewStatusApi.deleteBrewStatus (Just brewSessionCode)))

handleStep : Result.Result Error Api.Data.RecipeStep -> Msg
handleStep response =
  case response of
    Ok value ->
      UpdateStep (apiStepToRecipeStep value)
    Err e ->
      handleApiError e

handleApiError e =
  case e of
    BadStatus code ->
      case code of
        401 ->
          BrewSessionCodeRejected ("You are in spectator mode! Add brew session key to gain control.", True)
        _ ->
          ShowSnackbar (Debug.toString e)
    _ ->
      ShowSnackbar (Debug.toString e)

startStep : String -> String -> String -> Cmd Msg
startStep stepId brewSessionCode basePath =
  send handleStep (Api.withBasePath basePath (RecipeStepsApi.postStepStart stepId (Just brewSessionCode)))

finishStep : String -> String -> String -> Cmd Msg
finishStep stepId brewSessionCode basePath =
    send handleStep (Api.withBasePath basePath (RecipeStepsApi.deleteStepStart stepId (Just brewSessionCode)))

startCalibration : Int -> String -> String -> Cmd Msg
startCalibration grams brewSessionCode basePath=
  send (\response ->
         case response of
           Ok _ ->
             ShowSnackbar "Scale calibration started"
           Err e ->
             handleApiError e
       ) (Api.withBasePath basePath (ScaleApi.patchScaleRes grams (Just brewSessionCode)))


calibrate : String -> String -> Cmd Msg
calibrate brewSessionCode basePath =
  send (\response ->
          case response of
            Ok _ ->
              ShowSnackbar "Calibration in progress. Do not move the weight."
            Err e ->
              handleApiError e
        ) (Api.withBasePath basePath (ScaleApi.putScaleRes (Just brewSessionCode) ))


tareScale : String -> String -> Cmd Msg
tareScale brewSessionCode basePath =
  send (\response ->
          case response of
            Ok _ ->
              ShowSnackbar "Tare done"
            Err e ->
              handleApiError e
        ) (Api.withBasePath basePath (ScaleApi.deleteScaleRes (Just brewSessionCode)))


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
