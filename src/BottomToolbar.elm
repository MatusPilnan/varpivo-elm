module BottomToolbar exposing (..)

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Utilities.Border as Border
import Bootstrap.Utilities.Spacing as Spacing
import Html
import Html.Attributes as Attributes
import Material.Elevation as Elevation
import Material.Theme as Theme
import Material.Typography as Typography

bottomToolbar temperature boilTime =
  Html.div [ Elevation.z7, Theme.background, Attributes.class "varpivo-bottom-toolbar" ]
  [ Grid.row [ Row.attrs [ Spacing.px3 ] ]
    [ Grid.col [ Col.attrs [ Border.right ] ]
      [ Html.p [Typography.caption, Theme.textSecondaryOnBackground, Spacing.m0, Spacing.mt1] [Html.text "Kettle temp"]
      , Html.p [Typography.headline6, Spacing.m0 ] [Html.text (String.fromFloat temperature ++ " °C")]
      ]
    , Grid.col []
      [ Html.p [Typography.caption, Theme.textSecondaryOnBackground, Spacing.m0, Spacing.mt1] [Html.text "Remaining boil time"]
      , Html.p [Typography.headline6, Spacing.m0 ] [Html.text (String.fromInt boilTime ++ " min")]
      ]
    ]
  ]
