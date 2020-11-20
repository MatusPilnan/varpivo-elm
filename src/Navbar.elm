module Navbar exposing (..)

import Html exposing (text)
import Material.Elevation as Elevation
import Material.IconButton as IconButton
import Material.TopAppBar as TopAppBar


navbar title onTemperatureButtonClick onMenuClick =
  TopAppBar.regular TopAppBar.config
    [ TopAppBar.row [ Elevation.z8 ]
      [ TopAppBar.section [ TopAppBar.alignStart ]
        [  Html.span [ TopAppBar.title ] [ text title ] ]
      , TopAppBar.section [ TopAppBar.alignEnd ]
        [ IconButton.iconButton (IconButton.config |> IconButton.setOnClick onTemperatureButtonClick )
                                (IconButton.icon "whatshot")
        , IconButton.iconButton
          (IconButton.config
            |> IconButton.setAttributes
              [ TopAppBar.navigationIcon ]
            |> IconButton.setOnClick onMenuClick
          )
            (IconButton.icon "menu")
        ]
      ]
    ]

