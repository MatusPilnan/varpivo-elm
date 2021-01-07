port module Main exposing (..)

import Api exposing (send)
import Api.Data exposing (BrewSession, Recipe, RecipeList, StepsList)
import Api.Request.BrewSessionStatus as BrewStatusApi
import Api.Request.Info as InfoApi
import Api.Request.RecipeSteps as RecipeStepsApi
import Api.Request.Recipes as RecipesApi
import Api.Request.Scale as ScaleApi
import ApiErrorMessage exposing (apiErrorMessage)
import BottomToolbar exposing (bottomToolbar)
import Browser exposing (Document)
import Browser.Navigation as Navigation exposing (Key)
import Data.Conversions exposing (apiRecipeToRecipe, apiStepListToStepList, apiStepToRecipeStep)
import Data.Step exposing (RecipeStep, StepKind(..))
import Dialog exposing (calibrationDialogContent, confirmDialogContent, dialog, dialogActions, scaleDialogContent)
import Dict exposing (Dict)
import Duration exposing (Duration)
import Html exposing (Html)
import Http exposing (Error(..))
import Json.Decode exposing (decodeString, list, string)
import KegMessage exposing (handleKegMessage)
import Material.Typography as Typography
import Material.Snackbar as Snackbar
import Bootstrap.Grid as Grid
import Bootstrap.Utilities.Spacing as Spacing
import Bootstrap.Grid.Row as Row
import Maybe exposing (withDefault)
import Messages exposing (..)
import Model exposing (Flags, Model)
import Navbar exposing (navbar)
import Notification exposing (Notification)
import Page exposing (page)
import Data.Recipe exposing (BrewSessionData, RecipeListEntry)
import Result
import Router exposing (Route(..), navigate, route)
import Task
import Time exposing (Posix, Zone)
import Url exposing (Url)
import Url.Parser as Parser
import Url.Parser.Query as QueryParser




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
port connect : String -> Cmd msg
port notification: Notification -> Cmd msg
port notificationClick: (List String -> msg) -> Sub msg
port console : String -> Cmd msg
port messageReceiver : (String -> msg) -> Sub msg


init : Flags -> Url -> Key -> ( Model, Cmd Msg )
init flags url key =
  ( Model.init flags url key
  , Cmd.batch
    ( [ fetchBrewSession flags.apiBaseUrl
      , Task.perform SetTimeZone Time.here
      , Task.perform SetTime Time.now
      ] ++ getApiUrlsFromQueryString flags.apiDefaultProtocol url
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
      ({ model | value = model.value + 1, availableRecipes = list, loading = False }, Cmd.none)
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
      ({model | snackbarQueue = (Snackbar.addMessage (apiErrorMessage string) model.snackbarQueue), loading = False }, Cmd.none)

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
      ( { model | selectedRecipe = brewSessionData.recipeListEntry, recipeSteps = brewSessionData.steps, stepsOrder = brewSessionData.stepIds, loading = False, boilStartedAt = Maybe.map Time.millisToPosix brewSessionData.boilStartedAt}
      , Cmd.batch [console (Debug.toString (brewSessionData.recipeListEntry, brewSessionData.steps, brewSessionData.stepIds)), navigate model ["brew-session"][]]
      )

    StartStep stepId ->
      (model, startStep stepId model.apiBaseUrl)

    UpdateStep step ->
      ( { model | recipeSteps = (Dict.insert step.id step model.recipeSteps)}, Cmd.none )

    FinishStep stepId ->
      ( model
      , case Dict.get stepId model.recipeSteps of
          Just step ->
            case (step.started, step.finished) of
              (Just _, Nothing) ->
                Cmd.batch [finishStep stepId model.apiBaseUrl, navigate model [] []]
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
      ( model, if model.calibrationValue == -1 then Cmd.none else startCalibration model.calibrationValue model.apiBaseUrl )

    CalibrationWeightPlaced ->
      ( model, calibrate model.apiBaseUrl )

    TareScale ->
      ( model, tareScale model.apiBaseUrl)

    CancelBrewSession ->
      ( model, Cmd.batch [cancelBrewSession model.apiBaseUrl, fetchRecipes model.apiBaseUrl])

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
            if String.startsWith "http://" string || String.startsWith "https://" string
            then string
            else model.apiDefaultProtocol ++ string
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
      , Cmd.batch [saveConnections {selected = string, connections = storedApiUrls }, fetchBrewSession string, navigate model [""] [], connect (string ++ "/tap")]
      )

    RemoveApiUrl string ->
      let
        storedApiUrls =
          List.filter (\url -> url /= string) model.storedApiUrls
      in
      ( { model | storedApiUrls = storedApiUrls }, saveConnections {selected = withDefault "" model.selectedApiUrl, connections = storedApiUrls } )

    RejectApiUrl (reason, autoCheckedUrl) ->
      ( { model | newApiUrlFormError = (if autoCheckedUrl then Nothing else Just reason ), apiConnecting = False }, console reason )


getApiUrlsFromQueryString : String -> Url -> List (Cmd Msg)
getApiUrlsFromQueryString protocol url =
  let
    queryParser =
      Parser.query (QueryParser.string "connections")
  in
  case Parser.parse queryParser url of
    Just urls ->
      let
        decodedUrls =
          Result.withDefault [] (decodeString (list string) (Maybe.withDefault "[]" urls))
      in
      List.map (\address -> checkApiUrl (protocol ++ address) True) decodedUrls

    Nothing ->
      [Cmd.none]
      


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

                      ) (Api.withBasePath basePath InfoApi.getDiscover)

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
           , boilStartedAt = Maybe.map round value.boilStartedAt})
    Err _ ->
      Nothing


fetchBrewSession basePath =
  send (\response -> case (handleBrewSession response) of
                       Nothing ->
                         FetchRecipes
                       Just result ->
                         SetBrewSession result
                     ) (Api.withBasePath basePath BrewStatusApi.getBrewStatus)

cancelBrewSession basePath =
  send (\response -> case response of
                              Ok _ ->
                                SetBrewSession ({recipeListEntry = Nothing, steps = Dict.empty, stepIds = [], boilStartedAt = Nothing})
                              Err e ->
                                ShowSnackbar (Debug.toString e)
                            ) (Api.withBasePath basePath BrewStatusApi.deleteBrewStatus)

handleStep : Result.Result error Api.Data.RecipeStep -> Msg
handleStep response =
  case response of
    Ok value ->
      UpdateStep (apiStepToRecipeStep value)
    Err e ->
      ShowSnackbar (Debug.toString e)

startStep : String -> String -> Cmd Msg
startStep stepId basePath =
  send handleStep (Api.withBasePath basePath (RecipeStepsApi.postStepStart stepId))

finishStep : String -> String -> Cmd Msg
finishStep stepId basePath =
    send handleStep (Api.withBasePath basePath (RecipeStepsApi.deleteStepStart stepId))

startCalibration : Int -> String -> Cmd Msg
startCalibration grams basePath=
  send (\response ->
         case response of
           Ok _ ->
             ShowSnackbar "Scale calibration started"
           Err e ->
             ShowSnackbar (Debug.toString e)
       ) (Api.withBasePath basePath (ScaleApi.patchScaleRes grams))


calibrate : String -> Cmd Msg
calibrate basePath =
  send (\response ->
          case response of
            Ok _ ->
              ShowSnackbar "Calibration in progress. Do not move the weight."
            Err e ->
              ShowSnackbar (Debug.toString e)
        ) (Api.withBasePath basePath (ScaleApi.putScaleRes))


tareScale : String -> Cmd Msg
tareScale basePath =
  send (\response ->
          case response of
            Ok _ ->
              ShowSnackbar "Tare done"
            Err e ->
              ShowSnackbar (Debug.toString e)
        ) (Api.withBasePath basePath ScaleApi.deleteScaleRes)


-- VIEW

view : Model -> Document Msg
view model =
  { title = model.title
  , body =
    [ Html.div [ Typography.typography ]
      [ navbar model.title (isRecipeSelected model) model.menuOpened ( not (Dict.isEmpty model.recipeSteps) )
      , case model.dialogVariant of
          Nothing ->
            Html.div [] []

          Just Messages.Scale ->
            dialog (scaleDialogContent model.weight) (Just "Scale") Nothing

          Just (Confirm (prompt, action)) ->
            dialog (confirmDialogContent prompt) (Just "Confirm") (Just ( dialogActions ( Just action ) (Just ( CloseDialog Nothing ))))

          Just Calibration ->
            dialog (calibrationDialogContent) (Just "Scale calibration") (Just (dialogActions (Just StartCalibration) ( Just (CloseDialog Nothing)) ))

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
    ]
  }


isRecipeSelected : Model -> Bool
isRecipeSelected model =
  case model.selectedRecipe of
    Just _ ->
      True
    Nothing ->
       False
