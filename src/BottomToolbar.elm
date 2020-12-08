module BottomToolbar exposing (..)

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Utilities.Border as Border
import Bootstrap.Utilities.Spacing as Spacing
import Duration
import Html
import Html.Attributes as Attributes
import Material.Elevation as Elevation
import Material.Theme as Theme
import Material.Typography as Typography

bottomToolbar temperature boilTime heating =
  Html.div [ Elevation.z7, Theme.background, Attributes.class "varpivo-bottom-toolbar" ]
  [ Grid.row [ Row.attrs [ Spacing.px3 ] ]
    [ Grid.col [ Col.attrs [ Border.right ] ]
      [ Html.p [Typography.caption, Theme.textSecondaryOnBackground, Spacing.m0, Spacing.mt1] [Html.text "Kettle temp"]
      , Grid.row []
        [ Grid.col []
          [ Html.p [Typography.headline6, Spacing.m0 ] [Html.text (String.fromFloat temperature ++ " °C")]
          ]
        , Grid.col [ Col.attrs [Typography.headline6, Attributes.align "right"], Col.middleXs]
          [ Html.i [ Spacing.m0, Attributes.class "fas", Attributes.class "fa-fire", heaterIndicatorClass heating ] []
          ]
        ]
      ]
    , Grid.col []
      [ Html.p [Typography.caption, Theme.textSecondaryOnBackground, Spacing.m0, Spacing.mt1] [Html.text "Remaining boil time"]
      , Html.p [Typography.headline6, Spacing.m0 ] [Html.text (formattedBoilTime boilTime)]
      ]
    ]
  ]

formattedBoilTime input =
    case input of
        Nothing -> "00:00:00"
        Just boilTime -> (String.padLeft 2 '0' (String.fromInt (floor (Duration.inHours boilTime)))) ++ ":" ++ String.padLeft 2 '0' (String.fromInt (floor (Duration.inMinutes boilTime))) ++ ":" ++ String.padLeft 2 '0' (String.fromInt (modBy 60 (floor (Duration.inSeconds (boilTime)))))

heaterIndicatorClass heating =
  if heating
  then Attributes.class "varpivo-heater-on"
  else Attributes.class "varpivo-heater-off"
