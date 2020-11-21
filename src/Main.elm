port module Main exposing (..)

import Api exposing (send)
import Api.Data exposing (Recipe, RecipeList, StepsList)
import Api.Request.Default as Api
import ApiErrorMessage exposing (apiErrorMessage)
import Browser
import Data.Step exposing (RecipeStep)
import Dialog exposing (confirmDialogContent, dialog, dialogActions, scaleDialogContent)
import Html exposing (Html)
import Http
import KegMessage exposing (handleKegMessage)
import Material.Typography as Typography
import Material.Snackbar as Snackbar
import Bootstrap.Grid as Grid
import Bootstrap.Utilities.Spacing as Spacing
import Bootstrap.Utilities.Size as Size
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Messages exposing (..)
import Navbar exposing (navbar)
import Page exposing (page)
import Data.Recipe exposing (RecipeListEntry)
import Result




-- MAIN


main = Browser.element {init = init, view = view, update = update, subscriptions = subscriptions}

subscriptions : Model -> Sub Msg
subscriptions _ =
  messageReceiver Recv


-- PORTS


port sendMessage : String -> Cmd msg
port messageReceiver : (String -> msg) -> Sub msg


-- MODEL

type alias Model =
    { title : String
    , value : Float
    , availableRecipes : List RecipeListEntry
    , loading : Bool
    , snackbarQueue : Snackbar.Queue Msg
    , dialogVariant : Maybe DialogVariant
    , recipeSteps : List RecipeStep
    }

init : Int -> ( Model, Cmd Msg )
init _ =
  ({ title = "Var:Pivo"
  , value = 0
  , availableRecipes = []
  , loading = True
  , snackbarQueue = Snackbar.initialQueue
  , dialogVariant = Nothing
  , recipeSteps = []
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
    ListAppend list ->
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
    SelectRecipe string ->
      ( { model | loading = True} , fetchRecipeSteps string)
    SetSteps recipeSteps ->
      ( { model | recipeSteps = recipeSteps, loading = False }, Cmd.none )
    ApiError string ->
      ({model | snackbarQueue = (Snackbar.addMessage (apiErrorMessage string) model.snackbarQueue), loading = False }, Cmd.none)



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
                Ok value -> List.map  (\a -> {name = a.name , style_type = a.style.type_, style_name = a.style.name, id = a.id}) value.recipes
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
fetchRecipes = send (\msg -> ListAppend (handleRecipes msg)) (Api.getRecipeList)


-- VIEW

view : Model -> Html Msg
view model =
  Html.div [ Typography.typography ]
    [ navbar model.title (ShowDialog Scale) ToggleLoading
    , case model.dialogVariant of
        Nothing ->
          Html.div [] []

        Just Scale ->
          dialog (scaleDialogContent model.value) (Just "Scale") Nothing

        Just (Confirm (prompt, action)) ->
          dialog (confirmDialogContent prompt) (Just "Confirm") (Just ( dialogActions ( Just action ) (Just ( CloseDialog Nothing ))))

    , Grid.container [ Size.h100, Spacing.pt5 ]
      [ Grid.row [ Row.attrs [ Size.h100, Spacing.pt4 ] ]
        [ Grid.col [ Col.attrs [ Size.h100 ] ]
          [ page model ]
        ]
      ]
    , Snackbar.snackbar
              (Snackbar.config { onClosed = SnackbarClosed })
              model.snackbarQueue
    , Html.p [] [Html.text (Debug.toString model.recipeSteps)]
    ]
