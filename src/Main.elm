port module Main exposing (..)

import Api exposing (send)
import Api.Data exposing (Recipe, RecipeList, recipeStepDecoder, wSKegDecoder)
import Api.Request.Default as Api
import Browser
import Dialog exposing (dialog)
import Html exposing (Html, text)
import Html.Attributes as Attributes
import Http
import Json.Decode exposing (Error(..))
import Material.IconButton as IconButton
import Material.List.Item as ListItem
import Material.TopAppBar as TopAppBar
import Material.Typography as Typography
import Material.Elevation as Elevation
import Material.CircularProgress as CircularProgress
import Material.List as MatList
import Material.Snackbar as Snackbar
import Bootstrap.Grid as Grid
import Bootstrap.Utilities.Spacing as Spacing
import Bootstrap.Utilities.Size as Size
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
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
    [ navbar model.title
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


navbar : String -> Html Msg
navbar title =
  TopAppBar.regular TopAppBar.config
    [ TopAppBar.row [ Elevation.z8 ]
      [ TopAppBar.section [ TopAppBar.alignStart ]
        [  Html.span [ TopAppBar.title ] [ text title ] ]
      , TopAppBar.section [ TopAppBar.alignEnd ]
        [ IconButton.iconButton (IconButton.config |> IconButton.setOnClick ShowDialog )
                                (IconButton.icon "whatshot")
        , IconButton.iconButton
          (IconButton.config
            |> IconButton.setAttributes
              [ TopAppBar.navigationIcon ]
            |> IconButton.setOnClick ToggleLoading
          )
            (IconButton.icon "menu")
        ]
      ]
    ]


page: Model -> Html Msg
page model =
  if model.loading then loading else
    if List.isEmpty model.availableRecipes then noRecipes else recipeSelection model.availableRecipes


viewRecipeListEntry: RecipeListEntry -> Html Msg
viewRecipeListEntry recipeListEntry =
    ListItem.text []
      { primary = [ text recipeListEntry.name ]
      , secondary = [ text (recipeListEntry.style_name ++ " - " ++ recipeListEntry.style_type) ]
      }



recipeSelection: List RecipeListEntry -> Html Msg
recipeSelection recipes =
  let
      recipeListItems =
          List.map viewRecipeListEntry recipes
  in
  Html.div []
  [ Grid.row [ Row.attrs [ Spacing.pt2 ] ]
    [ Grid.col []
      [ Html.h4 [Typography.headline4 ] [text "What are we brewing?"]]
    ]
  , Grid.row []
    [ Grid.col [ Col.attrs [ Spacing.pt3 ] ]
      [ case recipeListItems of
        [] -> noRecipes
        first :: rest ->
          MatList.list
            (MatList.config
              |> MatList.setTwoLine True
              |> MatList.setAttributes [ Attributes.style "max-width" "600px", Attributes.style "border" "1px solid rgba(0,0,0,.1)" ])
            (ListItem.listItem ListItem.config
                [ first ]
            )
            [ ListItem.listItem ListItem.config
                rest
            ]
      ]
    ]
  ]


loading: Html Msg
loading =
  Html.div [ Size.h50, Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyAround ]
    [ Html.h4 [ Typography.headline4 ] [ text "Loading recipes" ]
    , CircularProgress.indeterminate (CircularProgress.config |> CircularProgress.setFourColored True)
    ]

noRecipes: Html Msg
noRecipes =
  Html.div [ Attributes.align "center", Size.h75, Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyCenter ]
  [ Html.h4 [ Typography.headline4, Spacing.p2 ] [ text "We couldn't find any recipes!" ]
  , Html.h4 [ Typography.headline4, Spacing.p2 ] [ text "\u{1F631} \u{1F625}" ]
  ]
