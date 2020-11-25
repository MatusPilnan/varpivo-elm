module Steps exposing (stepsListView)


import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Spacing as Spacing
import Data.Step exposing (RecipeStep, StepKind(..))
import Helpers exposing (availableSteps, timeOfDay)
import Html exposing (Html, text)
import Html.Attributes as Attributes exposing (style)
import Html.Events
import Material.Button as Button
import Material.Card as Card exposing (Block)
import Material.LinearProgress as LinearProgress
import Material.Theme as Theme
import Material.Typography as Typography
import Messages exposing (Msg(..))
import Time exposing (Zone)
import Url.Builder as Builder exposing (string)


stepView : RecipeStep -> Maybe Zone -> Html.Html Msg
stepView step timezone =
  Grid.row [ Row.attrs [ Spacing.mt2 ] ]
  [ Grid.col []
    [ Card.card
      (Card.config |> Card.setOutlined True |> Card.setAttributes ( stepCardBackground step ))
      { blocks =
        Card.primaryAction [ Html.Events.onClick (NavigateTo (Builder.absolute ["scale"] [string "step" step.id])) ] [ stepHeading step, stepInformation step timezone ]
      , actions = stepActions step
      }
    ]
  ]


stepsListView recipe steps timezone =
  Html.div [ Spacing.pb5 ]
    [ Grid.row []
      [ Grid.col []
        [ Html.h4 [ Typography.headline4 ] [ Html.text ("Brewing " ++ recipe.name) ]
        , stepsSummary steps
        ]
      ]
    , Html.div [] (List.map (\step -> stepView step timezone) steps)
    ]

stepHeading : RecipeStep -> Block msg
stepHeading step =
  Card.block <|
    Grid.row [ Row.attrs [ style "padding" "1rem" ]]
    [ Grid.col [ Col.attrs [ Spacing.pr0 ] ]
      [ Html.h2 [ Typography.headline6, style "margin" "0" ]
        [ text step.name ]
      , Html.h3 [ Typography.subtitle2, style "margin" "0" ]
        [ text step.description ]
      ]
    , Grid.col [ Col.xsAuto, Col.attrs [ Spacing.p0, Spacing.pr3, Attributes.align "center", Typography.headline6 ], Col.middleXs ]
      [ stepIcon step.kind
      ]
    ]


stepIcon : StepKind -> Html msg
stepIcon stepKind =
  case stepKind of
    Generic ->
      Html.i [ Attributes.class "fas", Attributes.class "fa-shoe-prints" ] []
    Water ->
      Html.i [ Attributes.class "fas", Attributes.class "fa-faucet" ] []
    Weight ->
      Html.i [ Attributes.class "fas", Attributes.class "fa-balance-scale" ] []
    KeepTemperature ->
      Html.i [ Attributes.class "fas", Attributes.class "fa-stopwatch" ] []
    SetTemperature ->
      Html.i [ Attributes.class "fas", Attributes.class "fa-temperature-high" ] []
    Hop ->
      Html.i [ Attributes.class "fab", Attributes.class "fa-raspberry-pi" ] []
    Misc ->
      Html.i [ Attributes.class "fas", Attributes.class "fa-flask" ] []



availableStepActions step =
  Just <|
    Card.fullBleedActions
      ( Card.button (Button.config |> Button.setOnClick (ApiError step.name)) "Start" )

stepActions step =
  if step.available then availableStepActions step else Nothing

stepInformation : RecipeStep -> Maybe Zone -> Block msg
stepInformation step timezone =
  Card.block <|
    Html.div [] [
    (( case ( step.started, step.finished ) of
         (Just start, Just finished) ->
           Html.div ([ style "padding" "0 1rem" ])
             (stepFinished step start finished timezone)
         (Just start, Nothing) ->
           Html.div [] (stepInProgress step start timezone)
         (Nothing, Just _) ->
           Html.div [] []
         (Nothing, Nothing) ->
           Html.div ([ style "padding" "0 1rem" ])
             (stepEstimation step.estimation)
  ))]

stepFinished step start finished timezone =
  [ stepStart start timezone ] ++
    [ Html.p [] [text ("Finished at " ++ timeOfDay finished timezone) ]]
      ++ ( case step.duration of
            Just duration ->
              [Html.p [] [text ("Duration: " ++ String.fromFloat duration ++ " minutes")]]
            Nothing ->
              []
       )

stepEstimation est =
  case est of
    Just estimate ->
      [Html.p [] [text ("Estimated duration: " ++ (String.fromFloat estimate) ++ " minutes.")]]
    Nothing ->
      []

stepInProgress step start timezone =
  [ Html.div ([ style "padding" "0 1rem" ])
    [ Grid.row [] [ Grid.col [] [stepStart start timezone]]
    , Grid.row []
      [ Grid.col [] (stepEstimation step.estimation)
      , Grid.col [ Col.attrs [ Flex.block, Flex.justifyEnd ]] [finishStepButton]
      ]
    ]
  ] ++
  [Html.div ([ style "padding" "0" ])
    [ case step.progress of
        Just progress ->
          LinearProgress.determinate LinearProgress.config { progress = progress }
        Nothing ->
          LinearProgress.indeterminate LinearProgress.config
    ]
  ]

stepStart start timezone =
  Html.p [] [text ("Started at " ++ timeOfDay start timezone)]

stepCardBackground step =
  case step.finished of
    Just _ ->
      [ Theme.onPrimary, Theme.primaryBg ]
    Nothing ->
      []

finishStepButton =
  Button.outlined Button.config "Finish"


stepsSummary : List RecipeStep -> Html.Html msg
stepsSummary steps =
  let
    inProgress =
      List.filter (\entry -> case (entry.started, entry.finished) of
                               (Just _, Nothing) ->
                                 True
                               (_, _) ->
                                 False
                  ) steps
    finished =
      List.filter (\entry -> case (entry.started, entry.finished) of
                               (Just _, Just _) ->
                                 True
                               (_, _) ->
                                 False
                  ) steps
  in

  Html.p [ Typography.subtitle1 ]
  [ Html.text (
    ( String.fromInt (List.length steps)) ++ " steps, " ++
      String.fromInt (List.length inProgress) ++ " in progress, " ++
      String.fromInt (availableSteps steps) ++ " available, " ++
      String.fromInt (List.length finished) ++ " finished, "
    )
  ]

