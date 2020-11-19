module Main exposing (..)

import Html exposing (Html, button, div, text)
import Material.Button as Button
import Material.IconButton as IconButton
import Material.TopAppBar as TopAppBar
import Material.Typography as Typography
import Bootstrap.Grid as Grid




-- MAIN


main =
  TopAppBar.regular TopAppBar.config
      [ TopAppBar.row []
          [ TopAppBar.section [ TopAppBar.alignStart ]
              [  Html.span [ TopAppBar.title ] [ text "Ty kokot" ] ]
          , TopAppBar.section [ TopAppBar.alignEnd ]
              [ IconButton.iconButton
                  (IconButton.config
                      |> IconButton.setAttributes
                          [ TopAppBar.navigationIcon ]
                  )
                  (IconButton.icon "menu")
              ]
          ]
      ]



-- MODEL

type alias Model = Int

init : Model
init =
  0


-- UPDATE

type Msg = Increment | Decrement

update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1


-- VIEW

view : Model -> Html Msg
view model =
  Grid.container [ Typography.typography ]
    [ Html.h1 [] [text "Ty kokot"]
    , Button.raised (Button.config |> Button.setOnClick Decrement) "---"
    , div [] [ text (String.fromInt model) ]
    , Button.raised (Button.config |> Button.setOnClick Increment) "+"
    ]
