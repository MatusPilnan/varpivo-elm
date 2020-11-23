port module Main exposing (..)

import Api exposing (send)
import Api.Data exposing (Recipe, RecipeList, StepsList)
import Api.Request.Default as Api
import ApiErrorMessage exposing (apiErrorMessage)
import BottomToolbar exposing (bottomToolbar)
import Browser exposing (Document)
import Browser.Navigation as Navigation exposing (Key)
import Data.Step exposing (RecipeStep)
import Dialog exposing (confirmDialogContent, dialog, dialogActions, scaleDialogContent)
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
port messageReceiver : (String -> msg) -> Sub msg


-- MODEL

type alias Model =
    { key : Key
    , url : Url
    ,title : String
    , value : Float
    , availableRecipes : List RecipeListEntry
    , loading : Bool
    , snackbarQueue : Snackbar.Queue Msg
    , dialogVariant : Maybe DialogVariant
    , recipeSteps : List RecipeStep
    , selectedRecipe : Maybe RecipeListEntry
    , timezone : Maybe Zone
    }

init : Int -> Url -> Key -> ( Model, Cmd Msg )
init _ url key = (
  { url = url
  , key = key
  , title = "Var:Pivo"
  , value = 0
  , availableRecipes = []
  , loading = True
  , snackbarQueue = Snackbar.initialQueue
  , dialogVariant = Nothing
  , recipeSteps = []
  , selectedRecipe = Nothing
  , timezone = Nothing
  }, fetchRecipes)


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
    ToggleLoading ->
      ({ model | loading = True}, fetchRecipes)
    SetAvailableRecipes list ->
      ({ model | value = model.value + 1, availableRecipes = list, loading = False }, Cmd.none)
    Recv data ->
      handleKegMessage data model
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
      ( { model | loading = True, selectedRecipe = Just recipe} , fetchRecipeSteps recipe.id)
    SetSteps recipeSteps ->
      ( { model | recipeSteps = recipeSteps, loading = False },
      Cmd.batch [Navigation.pushUrl model.key (Url.Builder.absolute ["brew-session"] []), Task.perform SetTimeZone Time.here])
    ApiError string ->
      ({model | snackbarQueue = (Snackbar.addMessage (apiErrorMessage string) model.snackbarQueue), loading = False }, Cmd.none)

    ShowRecipeDetail recipeListEntry ->
      ( { model | selectedRecipe = Just recipeListEntry} , Navigation.pushUrl model.key (Url.Builder.absolute ["recipe"] []))

    LinkClicked urlRequest ->
      case urlRequest of
        Browser.Internal url ->
          ( model, Navigation.pushUrl model.key (Url.toString url) )

        Browser.External href ->
          ( model, Navigation.load href )

    UrlChanged url ->
      route url model

    NavigateTo string ->
      ( model, Navigation.pushUrl model.key string )

    RequestTimeZone ->
      ( model, Task.perform SetTimeZone Time.here )

    SetTimeZone zone ->
      ( { model | timezone = Just zone}, Cmd.none)





handleSteps: Result Http.Error StepsList -> List RecipeStep
handleSteps res = case res of
                Ok value ->
                  List.map ( \entry ->
                    { started = entry.started
                    , finished = entry.finished
                    , progress = entry.progress
                    , estimation = entry.estimation
                    , description = entry.description
                    , duration = entry.durationMins
                    , name = entry.name
                    , available = entry.available
                    }) value.steps
                Err _ ->
                  []

handleRecipes: Result Http.Error RecipeList -> List RecipeListEntry
handleRecipes res = case res of
                Ok value -> List.map  (\a ->
                  { name = a.name
                  , style_type = a.style.type_
                  , style_name = a.style.name
                  , id = a.id
                  , ingredients = List.map (\i -> {name = i.name, unit = i.unit, amount = i.amount}) a.ingredients}) value.recipes
                Err _ -> []


fetchRecipeSteps: String -> Cmd Msg
fetchRecipeSteps recipeId = send ( \msg ->
                                     case (handleSteps msg) of
                                        [] ->
                                          ApiError "Couldn't get recipe steps!"
                                        first :: rest ->
                                          SetSteps (first :: rest)
                                     ) (Api.postRecipe recipeId)

fetchRecipes: Cmd Msg
fetchRecipes = send (\msg -> SetAvailableRecipes (handleRecipes msg)) (Api.getRecipeList)


-- VIEW

view : Model -> Document Msg
view model =
  { title = model.title
  , body =
    [ Html.div [ Typography.typography ]
      [ navbar model.title (ShowDialog Scale) ToggleLoading
      , case model.dialogVariant of
          Nothing ->
            Html.div [] []

          Just Scale ->
            dialog (scaleDialogContent model.value) (Just "Scale") Nothing

          Just (Confirm (prompt, action)) ->
            dialog (confirmDialogContent prompt) (Just "Confirm") (Just ( dialogActions ( Just action ) (Just ( CloseDialog Nothing ))))

      , Grid.container [ Spacing.py5 ]
        [ Grid.row [ Row.attrs [ Spacing.pt4 ] ]
          [ Grid.col []
            [ page model ]
          ]
        ]
      , Snackbar.snackbar
                (Snackbar.config { onClosed = SnackbarClosed })
                model.snackbarQueue
      , if not (List.isEmpty model.recipeSteps) then
          bottomToolbar model.value model.value
        else Html.div [] []
      ]
    ]
  }
