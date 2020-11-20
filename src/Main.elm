port module Main exposing (..)

import Api exposing (send)
import Api.Data exposing (Recipe, RecipeList, recipeStepDecoder, wSKegDecoder)
import Api.Request.Default as Api
import Browser
import Dialog exposing (dialog)
import Html exposing (Html)
import Http
import Json.Decode exposing (Error(..))
import Material.Typography as Typography
import Material.Snackbar as Snackbar
import Bootstrap.Grid as Grid
import Bootstrap.Utilities.Spacing as Spacing
import Bootstrap.Utilities.Size as Size
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Navbar exposing (navbar)
import Page exposing (page)
import Recipes exposing (RecipeListEntry)
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
    , dialogOpen : Bool
    }

init : Int -> ( Model, Cmd Msg )
init _ =
  ({ title = "Var:Pivo"
  , value = 0
  , availableRecipes = []
  , loading = True
  , snackbarQueue = Snackbar.initialQueue
  , dialogOpen = False
  }, fetchRecipes)


-- UPDATE

type Msg = Increment
  | Decrement
  | ToggleLoading
  | ListAppend (List RecipeListEntry)
  | Recv String
  | SnackbarClosed Snackbar.MessageId
  | Send
  | ShowDialog
  | CloseDialog

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
      case Json.Decode.decodeString wSKegDecoder data of
        Result.Ok value ->
          case value.content of
            "step" ->
              case Json.Decode.decodeString recipeStepDecoder value.payload of
                Result.Ok step ->
                  ({ model | title = step.name}, Cmd.none)

                Result.Err e ->
                  handleJsonDecodeError e model
            "weight" ->
              case Json.Decode.decodeString Json.Decode.float value.payload of
                Result.Ok weight ->
                  ({model | value = weight}, Cmd.none)

                Result.Err e ->
                  handleJsonDecodeError e model

            _ ->
              ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message value.payload) model.snackbarQueue) }, Cmd.none)
        Result.Err e ->
          handleJsonDecodeError e model

    Send ->
      ( model, sendMessage "message" )

    ShowDialog ->
      ( { model | dialogOpen = True }, Cmd.none )

    CloseDialog ->
      ( { model | dialogOpen = False }, Cmd.none )




--handleRecipe: Result Http.Error Recipe -> List RecipeListEntry
--handleRecipe res = case res of
--                Ok value -> [{name = value.name , style_type = value.style.type_, style_name = value.style.name, id = value.id}]
--                Err _ -> []

handleRecipes: Result Http.Error RecipeList -> List RecipeListEntry
handleRecipes res = case res of
                Ok value -> List.map  (\a -> {name = a.name , style_type = a.style.type_, style_name = a.style.name, id = a.id}) value.recipes
                Err _ -> []


--fetchRecipe: String -> Cmd Msg
--fetchRecipe nieco = send (\msg -> ListAppend (handleRecipe msg)) (Api.getRecipe nieco)

fetchRecipes: Cmd Msg
fetchRecipes = send (\msg -> ListAppend (handleRecipes msg)) (Api.getRecipeList)


handleJsonDecodeError e model =
  case e of
    Field string _ ->
       ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message string) model.snackbarQueue) }, Cmd.none)

    Index int _ ->
       ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message (String.fromInt int)) model.snackbarQueue) }, Cmd.none)

    OneOf _ ->
       ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message "oneof errors") model.snackbarQueue) }, Cmd.none)

    Failure string _ ->
       ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message string) model.snackbarQueue) }, Cmd.none)


-- VIEW

view : Model -> Html Msg
view model =
  Html.div [ Typography.typography ]
    [ navbar model.title ShowDialog ToggleLoading
    , dialog model.value model.dialogOpen CloseDialog
    , Grid.container [ Size.h100, Spacing.pt5 ]
      [ Grid.row [ Row.attrs [ Size.h100, Spacing.pt4 ] ]
        [ Grid.col [ Col.attrs [ Size.h100 ] ]
          [ page model ]
        ]
      ]
    , Snackbar.snackbar
              (Snackbar.config { onClosed = SnackbarClosed })
              model.snackbarQueue
    ]
