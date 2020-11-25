module Scale exposing (..)

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Size as Size
import Bootstrap.Utilities.Spacing as Spacing
import Helpers exposing (center)
import Html exposing (text)
import Html.Attributes as Attributes
import Material.Button as Button
import Material.Icon as Icon
import Material.Theme as Theme
import Material.Typography as Typography
import Maybe exposing (withDefault)
import Messages exposing (Msg(..))


scale model stepId =
  let
    target =
    -- TODO get target weight from... somewhere?
      50
    (icon, targetText, hasId) =
      case stepId of
        Just _ ->
          case (compare model.weight target) of
            LT ->
              ( Icon.icon [ Attributes.class "varpivo-scale-add" ] ("arrow_drop_up")
              , Html.p [ Typography.headline4, Spacing.p2, Attributes.align "end" ]
                [ text "Target: "
                , Html.span [ Attributes.class "varpivo-scale-add" ] [text (String.fromFloat target ++ " g") ]
                ]
              , True
              )
            EQ ->
              ( Icon.icon [] ("check")
              , Html.p [ Typography.headline4, Spacing.p2, Attributes.align "end" ]
                              [ text ("Target: " ++ String.fromFloat target ++ " g") ]
              , True
              )
            GT ->
              ( Icon.icon [  Attributes.class "varpivo-scale-remove"  ] ("arrow_drop_down")
              , Html.p [ Typography.headline4, Spacing.p2, Attributes.align "end" ]
                [ text "Target: "
                , Html.span [ Attributes.class "varpivo-scale-remove" ] [text (String.fromFloat target ++ " g") ]
                ]
              , True
              )
        Nothing ->
          (Html.div [] [], Html.div [] [], False)
  in
  Html.div [ center, Attributes.align "center", Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyBetween ]
    [ Grid.row []
      [ Grid.col []
        [ Html.h2 [ Typography.headline4, Spacing.p2 ] [ text "Scale" ]
        , Html.p [ Typography.subtitle1, Theme.textSecondaryOnBackground ] [ text (withDefault "" stepId)]
        ]
      ]
    , Grid.row [ Row.attrs [Size.w100] ]
      [ Grid.col []
        [ Grid.row []
          [ Grid.col [ Col.attrs [ Size.w100 ] ]
            [ Html.p [ Typography.headline1, Spacing.p2, Attributes.align "end" ] [ text (String.fromFloat model.weight) ]
            ]
          , Grid.col [ Col.xs2, Col.middleXs ]
            [ icon
            , Html.div [] [Html.p [ Typography.headline6 ] [ text " g"]]
            ]
          ]
        , Grid.row []
          [ Grid.col []
            [ targetText ]
          ]
        ]
      ]
    , Grid.row []
      [ Grid.col [] [ Button.outlined (Button.config |> Button.setDisabled True) "Tare" ]
      , Grid.col [] [ Button.outlined (Button.config |> Button.setOnClick (NavigateTo "/")) "Cancel" ]
      , if hasId then Grid.col [] [ Button.unelevated (Button.config |> Button.setDisabled True) "Confirm" ]
        else Grid.col [] [ Button.outlined (Button.config |> Button.setDisabled True) "Calibrate" ]
      ]
    ]
