module Scale exposing (..)

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Size as Size
import Bootstrap.Utilities.Spacing as Spacing
import Data.Step exposing (RecipeStep)
import Dict
import Helpers exposing (center)
import Html exposing (text)
import Html.Attributes as Attributes
import Material.Button as Button
import Material.Icon as Icon
import Material.Theme as Theme
import Material.Typography as Typography
import Maybe exposing (withDefault)
import Messages exposing (DialogVariant(..), Msg(..))


scale : { a | recipeSteps : Dict.Dict String RecipeStep, weight : Float } -> Maybe String -> Html.Html Msg
scale model stepId =
  let
    target =
      withDefault -1 (withDefault Data.Step.empty (Dict.get (withDefault "" stepId) model.recipeSteps)).target
    subtitle =
      (withDefault Data.Step.empty (Dict.get (withDefault "" stepId) model.recipeSteps)).description
    (icon, targetText, hasId) =
      case (stepId, Dict.member (withDefault "" stepId) model.recipeSteps) of
        (Just _, True) ->
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
        (_, _) ->
          (Html.div [] [], Html.div [] [], False)
  in
  Html.div [ center, Attributes.align "center", Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyBetween ]
    [ Grid.row []
      [ Grid.col []
        [ Html.h2 [ Typography.headline4, Spacing.p2 ] [ text "Scale" ]
        , Html.p [ Typography.subtitle1, Theme.textSecondaryOnBackground ] [ text subtitle]
        ]
      ]
    , Grid.row [ Row.attrs [Size.w100] ]
      [ Grid.col []
        [ Grid.row []
          [ Grid.col [ Col.xs10, Col.attrs [ Size.w100 ] ]
            [ Html.p [ Typography.headline1, Spacing.p2, Attributes.align "end" ] [ text (String.fromFloat (max model.weight 0)) ]
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
      [ Grid.col [] [ Button.outlined (Button.config |> Button.setOnClick TareScale) "Tare" ]
      , Grid.col [] [ Button.outlined (Button.config |> Button.setOnClick (NavigateTo "/")) "Cancel" ]
      , if hasId then Grid.col [] [ Button.unelevated (Button.config |> Button.setDisabled True) "Confirm" ]
        else Grid.col [] [ Button.outlined (Button.config |> Button.setOnClick (ShowDialog Calibration)) "Calibrate" ]
      ]
    ]
