module Navbar exposing (..)

import Html
import Material.Button as Button
import Material.Elevation as Elevation
import Material.IconButton as IconButton
import Material.Menu as Menu
import Material.Theme as Theme
import Material.TopAppBar as TopAppBar
import Messages exposing (DialogVariant(..), Msg(..))


navbar : String -> Bool -> Bool -> Html.Html Msg
navbar title showRecipeButton brewSessionCodeValid =
  TopAppBar.regular TopAppBar.config
    [ TopAppBar.row [ Elevation.z8 ]
      [ TopAppBar.section [ TopAppBar.alignStart, TopAppBar.title ]
        [ Html.span []
          [ Button.text (Button.config
            |> Button.setOnClick ( NavigateTo ([], []) )
            |> Button.setAttributes [ Theme.onPrimary ]) title ]
        ]
      , TopAppBar.section [ TopAppBar.alignEnd, Menu.surfaceAnchor ]
        [ IconButton.iconButton
          ( IconButton.config
            |> IconButton.setOnClick (ShowDialog Security)
            |> IconButton.setAttributes [ TopAppBar.navigationIcon ]
          ) (IconButton.icon (if brewSessionCodeValid then "verified_user" else "vpn_key"))
        , if showRecipeButton then
            IconButton.iconButton (
              IconButton.config
              |> IconButton.setOnClick (NavigateTo (["recipe"], []))
              |> IconButton.setAttributes [ TopAppBar.navigationIcon ] )
                                (IconButton.icon "menu_book")
          else Html.div [] []
        , IconButton.iconButton
          (IconButton.config
            |> IconButton.setAttributes
              [ TopAppBar.navigationIcon ]
            |> IconButton.setOnClick MenuOpened
          )
            (IconButton.icon "menu")
        ]
      ]
    ]
