module Navbar exposing (..)

import Html exposing (text)
import Material.Button as Button
import Material.Elevation as Elevation
import Material.IconButton as IconButton
import Material.List as List
import Material.List.Item as ListItem
import Material.Menu as Menu
import Material.Theme as Theme
import Material.TopAppBar as TopAppBar
import Messages exposing (DialogVariant(..), Msg(..))


navbar title showRecipeButton menuOpen =
  TopAppBar.regular TopAppBar.config
    [ TopAppBar.row [ Elevation.z8 ]
      [ TopAppBar.section [ TopAppBar.alignStart, TopAppBar.title ]
        [ Html.span []
          [ Button.text (Button.config
            |> Button.setOnClick ( NavigateTo "" )
            |> Button.setAttributes [ Theme.onPrimary ]) title ]
        ]
      , TopAppBar.section [ TopAppBar.alignEnd ]
        [ if showRecipeButton then
            IconButton.iconButton (IconButton.config |> IconButton.setOnClick (NavigateTo "recipe") )
                                (IconButton.icon "menu_book")
          else Html.div [] []
        , IconButton.iconButton
          (IconButton.config
            |> IconButton.setAttributes
              [ TopAppBar.navigationIcon ]
            |> IconButton.setOnClick MenuOpened
          )
            (IconButton.icon "menu")
        , menu menuOpen
        ]
      ]
    ]

menu open =
  Html.div [ Menu.surfaceAnchor ]
    [ Menu.menu
      (Menu.config
        |> Menu.setOpen open
        |> Menu.setOnClose MenuClosed
      )
      [ List.list
        (List.config |> List.setWrapFocus True )
        (ListItem.listItem (ListItem.config |> ListItem.setOnClick (ShowDialog Scale)) [ text "Mini scale" ]
        )
        [ListItem.listItem (ListItem.config |> ListItem.setOnClick (ShowDialog Calibration)) [ text "Calibrate scale" ]
        ]
      ]
    ]
