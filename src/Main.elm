module Main exposing (..)

import Api exposing (send)
import Api.Data exposing (Recipe)
import Api.Request.Default as Api
import Browser
import Html exposing (Html, div, text)
import Http
import Material.Button as Button
import Material.IconButton as IconButton
import Material.TopAppBar as TopAppBar
import Material.Typography as Typography
import Material.Elevation as Elevation
import Bootstrap.Grid as Grid
import Bootstrap.Utilities.Spacing as Spacing
import Recipes exposing (RecipeListEntry)
import Result exposing (map)




-- MAIN


main = Browser.element {init = init, view = view, update = update, subscriptions = subscriptions}

subscriptions : Model -> Sub Msg
subscriptions m = Sub.none


-- MODEL

type alias Model =
    { title : String
    , value : Int
    , availableRecipes : List RecipeListEntry
    , loading : Bool
    }

init : Int -> ( Model, Cmd msg )
init i =
  ({ title = "Var:Pivo"
  , value = 0
  , availableRecipes = []
  , loading = True
  }, Cmd.none)


-- UPDATE

type Msg = Increment | Decrement | ToggleLoading | ListAppend RecipeListEntry

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Increment ->
      ({ model | value = model.value + 1}, Cmd.none)
      --{ model | value = model.value + 1, availableRecipes = model.availableRecipes ++ [ "dalsi" ] }

    Decrement ->
      ({ model | value = model.value - 1, availableRecipes = List.drop 1 model.availableRecipes }, Cmd.none)

    ToggleLoading ->
      ({ model | loading = True}, fetchRecipe "test.xml0")

    ListAppend listEntry ->
      ({ model | value = model.value + 1, availableRecipes = model.availableRecipes ++ [ listEntry ], loading = False }, Cmd.none)


spracuj: Result Http.Error Recipe -> RecipeListEntry
spracuj res = case res of
                Ok value -> {name = value.name , style_type = value.style.type_, style_name = value.style.name, id = value.id}
                Err msg -> {name = "", id = "", style_name = "", style_type = ""}

niecoserrorom: Result Http.Error Recipe -> Msg
niecoserrorom msg = ListAppend (spracuj msg)



fetchRecipe: String -> Cmd Msg
fetchRecipe nieco = send niecoserrorom (Api.getRecipe nieco)

-- VIEW

view : Model -> Html Msg
view model =
  Html.div []
    [ navbar model.title
    , Grid.container [ Typography.typography ]
      [ Grid.row []
        [ Grid.col []
          [ Html.div [ Spacing.mt5, Spacing.pt3 ]
            [ Html.h1 [] [text "Ty kokot"]
            , Button.raised (Button.config |> Button.setOnClick Decrement) "-"
            , div [] [ text (String.fromInt model.value) ]
            , Button.raised (Button.config |> Button.setOnClick Increment) "+"
            , page model
            ]
          ]
        ]
      ]
    ]


navbar : String -> Html Msg
navbar title =
  TopAppBar.regular TopAppBar.config
    [ TopAppBar.row [ Elevation.z8 ]
      [ TopAppBar.section [ TopAppBar.alignStart ]
        [  Html.span [ TopAppBar.title ] [ text title ] ]
      , TopAppBar.section [ TopAppBar.alignEnd ]
        [ IconButton.iconButton (IconButton.config |> IconButton.setOnClick Increment )
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
  if List.length model.availableRecipes == 0 then
      if model.loading then loading else noRecipes
  else recipeSelection model.availableRecipes


viewRecipeListEntry: RecipeListEntry -> Html Msg
viewRecipeListEntry recipeListEntry =
    div [] [
        div [] [
            text recipeListEntry.name
        ],
        div [] [
            text recipeListEntry.id
        ]
    ]



recipeSelection: List RecipeListEntry -> Html Msg
recipeSelection recipes =
  div [] (List.map viewRecipeListEntry recipes)


loading: Html Msg
loading =
  Html.h2 [] [ text "Nacitanie"]

noRecipes =
  Html.h2 [] [ text "Holy kokot" ]
