module Main exposing (..)

import Browser
import Html exposing (Html, div, text)
import Material.Button as Button
import Material.IconButton as IconButton
import Material.TopAppBar as TopAppBar
import Material.Typography as Typography
import Material.Elevation as Elevation
import Bootstrap.Grid as Grid
import Bootstrap.Utilities.Spacing as Spacing




-- MAIN


main =
    Browser.sandbox {init = init, view = view, update = update}




-- MODEL

type alias Model =
    { title : String
    , value : Int
    , availableRecipes : List String
    , loading : Bool
    }

init : Model
init =
  { title = "Var:Pivo"
  , value = 0
  , availableRecipes = []
  , loading = True
  }


-- UPDATE

type Msg = Increment | Decrement | ToggleLoading | ListAppend

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      { model | value = model.value + 1, availableRecipes = model.availableRecipes ++ [ "dalsi" ] }

    Decrement ->
      { model | value = model.value - 1, availableRecipes = List.drop 1 model.availableRecipes }

    ToggleLoading ->
      { model | loading = not model.loading }

    ListAppend ->
      { model | value = model.value + 1, availableRecipes = model.availableRecipes ++ [ "dalsi" ] }


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
        [ IconButton.iconButton (IconButton.config |> IconButton.setOnClick ListAppend )
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

recipeSelection: List String -> Html Msg
recipeSelection recipes =
  Html.h2 [] [ text (String.join ", " recipes) ]


loading: Html Msg
loading =
  Html.h2 [] [ text "Nacitanie"]

noRecipes =
  Html.h2 [] [ text "Holy kokot" ]
