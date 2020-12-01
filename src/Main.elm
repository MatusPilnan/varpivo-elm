port module Main exposing (..)

import Api exposing (send)
import Api.Data exposing (BrewSession, Recipe, RecipeList, StepsList)
import Api.Request.Default as Api
import ApiErrorMessage exposing (apiErrorMessage)
import BottomToolbar exposing (bottomToolbar)
import Browser exposing (Document)
import Browser.Navigation as Navigation exposing (Key)
import Data.Conversions exposing (apiRecipeToRecipe, apiStepListToStepList, apiStepToRecipeStep)
import Data.Step exposing (RecipeStep, StepKind(..))
import Dialog exposing (calibrationDialogContent, confirmDialogContent, dialog, dialogActions, scaleDialogContent)
import Dict exposing (Dict)
import Html exposing (Html)
import Http
import KegMessage exposing (handleKegMessage)
import Material.Typography as Typography
import Material.Snackbar as Snackbar
import Bootstrap.Grid as Grid
import Bootstrap.Utilities.Spacing as Spacing
import Bootstrap.Grid.Row as Row
import Messages exposing (..)
import Navbar exposing (navbar)
import Page exposing (page)
import Data.Recipe exposing (RecipeListEntry)
import Result
import Router exposing (route)
import Task
import Time exposing (Zone)
import Url exposing (Url)
import Url.Builder




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
  messageReceiver Recv


-- PORTS


port sendMessage : String -> Cmd msg
port console : String -> Cmd msg
port messageReceiver : (String -> msg) -> Sub msg


-- MODEL

type alias Model =
    { key : Key
    , url : Url
    , apiBaseUrl : String
    , title : String
    , value : Float
    , weight : Float
    , temperature : Float
    , heating : Bool
    , remainingBoilTime : Int
    , availableRecipes : List RecipeListEntry
    , loading : Bool
    , snackbarQueue : Snackbar.Queue Msg
    , dialogVariant : Maybe DialogVariant
    , recipeSteps : Dict String RecipeStep
    , stepsOrder : List String
    , selectedRecipe : Maybe RecipeListEntry
    , timezone : Maybe Zone
    , menuOpened : Bool
    , calibrationValue : Int
    }

init : String -> Url -> Key -> ( Model, Cmd Msg )
init apiBaseUrl url key = (
  { url = url
  , key = key
  , apiBaseUrl = apiBaseUrl
  , title = "Var:Pivo"
  , value = 0
  , weight = 0
  , temperature = 0
  , heating = False
  , remainingBoilTime = 0
  , availableRecipes = []
  , loading = True
  , snackbarQueue = Snackbar.initialQueue
  , dialogVariant = Nothing
  , recipeSteps = Dict.empty
  , stepsOrder = []
  , selectedRecipe = Nothing
  , timezone = Nothing
  , menuOpened = False
  , calibrationValue = -1
  }, Cmd.batch [fetchBrewSession apiBaseUrl, Task.perform SetTimeZone Time.here] )


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
      handleKegMessage data model console
    Send ->
      ( model, sendMessage "message" )
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
      ( { model | recipeSteps = recipeSteps, stepsOrder = stepOrder,loading = False }, Navigation.pushUrl model.key (Url.Builder.absolute ["brew-session"] []))
    ShowSnackbar string ->
      ({model | snackbarQueue = (Snackbar.addMessage (apiErrorMessage string) model.snackbarQueue), loading = False }, Cmd.none)

    ShowRecipeDetail recipeListEntry ->
      ( { model | selectedRecipe = Just recipeListEntry}, Navigation.pushUrl model.key (Url.Builder.absolute ["recipe"] []))

    LinkClicked urlRequest ->
      case urlRequest of
        Browser.Internal url ->
          ( model, Navigation.pushUrl model.key (Url.toString url) )

        Browser.External href ->
          ( model, Navigation.load href )

    UrlChanged url ->
      route url model console

    NavigateTo string ->
      ( model, Cmd.batch [Navigation.pushUrl model.key string, sendMessage string ])

    RequestTimeZone ->
      ( model, Task.perform SetTimeZone Time.here )

    SetTimeZone zone ->
      ( { model | timezone = Just zone}, Cmd.none)

    SetBrewSession (recipeListEntry, recipeSteps, stepsOrder) ->
      ( { model | selectedRecipe = Just recipeListEntry, recipeSteps = recipeSteps, stepsOrder = stepsOrder, loading = False}
      , Navigation.pushUrl model.key (Url.toString model.url)
      )

    StartStep stepId ->
      (model, startStep stepId model.apiBaseUrl)

    UpdateStep step ->
      ( { model | recipeSteps = (Dict.insert step.id step model.recipeSteps)}, Cmd.none )

    FinishStep stepId ->
      ( model, finishStep stepId model.apiBaseUrl )

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
      SetSteps (steps, order)) (Api.withBasePath basePath (Api.postRecipe recipeId))

fetchRecipes: String -> Cmd Msg
fetchRecipes basePath = send (\msg -> SetAvailableRecipes (handleRecipes msg)) (Api.withBasePath basePath Api.getRecipeList)


handleBrewSession: Result Http.Error BrewSession -> Maybe (RecipeListEntry, Dict String RecipeStep, List String)
handleBrewSession response =
  case response of
    Ok value ->
      Just (apiRecipeToRecipe value.recipe
           , Dict.fromList (List.map (\step -> (step.id, apiStepToRecipeStep step)) value.steps)
           , List.map (\step -> step.id) value.steps
           )
    Err _ ->
      Nothing


fetchBrewSession basePath =
  send (\response -> case (handleBrewSession response) of
                       Nothing ->
                         FetchRecipes
                       Just result ->
                         SetBrewSession result
                     ) (Api.withBasePath basePath Api.getBrewStatus)


handleStep : Result.Result error Api.Data.RecipeStep -> Msg
handleStep response =
  case response of
    Ok value ->
      UpdateStep (apiStepToRecipeStep value)
    Err e ->
      ShowSnackbar (Debug.toString e)

startStep : String -> String -> Cmd Msg
startStep stepId basePath =
  send handleStep (Api.withBasePath basePath (Api.postStepStart stepId))

finishStep : String -> String -> Cmd Msg
finishStep stepId basePath =
    send handleStep (Api.withBasePath basePath (Api.deleteStepStart stepId))

startCalibration : Int -> String -> Cmd Msg
startCalibration grams basePath=
  send (\response ->
         case response of
           Ok _ ->
             ShowSnackbar "Scale calibration started"
           Err e ->
             ShowSnackbar (Debug.toString e)
       ) (Api.withBasePath basePath (Api.patchScaleRes grams))


calibrate basePath =
  send (\response ->
          case response of
            Ok _ ->
              ShowSnackbar "Calibration in progress. Do not move the weight."
            Err e ->
              ShowSnackbar (Debug.toString e)
        ) (Api.withBasePath basePath (Api.putScaleRes))


tareScale basePath =
  send (\response ->
          case response of
            Ok _ ->
              ShowSnackbar "Tare done"
            Err e ->
              ShowSnackbar (Debug.toString e)
        ) (Api.withBasePath basePath Api.deleteScaleRes)


-- VIEW

view : Model -> Document Msg
view model =
  { title = model.title
  , body =
    [ Html.div [ Typography.typography ]
      [ navbar model.title (isRecipeSelected model) model.menuOpened
      , case model.dialogVariant of
          Nothing ->
            Html.div [] []

          Just Scale ->
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
