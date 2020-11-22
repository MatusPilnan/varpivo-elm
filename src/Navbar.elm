module Navbar exposing (..)

import Html
import Material.Button as Button
import Material.Elevation as Elevation
import Material.IconButton as IconButton
import Material.Theme as Theme
import Material.TopAppBar as TopAppBar
import Messages exposing (Msg(..))


navbar title onTemperatureButtonClick onMenuClick =
  TopAppBar.regular TopAppBar.config
    [ TopAppBar.row [ Elevation.z8 ]
      [ TopAppBar.section [ TopAppBar.alignStart, TopAppBar.title ]
        [ Html.span []
          [ Button.text (Button.config
            |> Button.setOnClick ( NavigateTo "/" )
            |> Button.setAttributes [ Theme.onPrimary ]) title ]
        ]
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

