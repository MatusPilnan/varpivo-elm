module Steps exposing (stepsListView)


import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Spacing as Spacing
import Data.Step exposing (RecipeStep)
import Html exposing (text)
import Html.Attributes exposing (style)
import Material.Button as Button
import Material.Card as Card exposing (Block)
import Material.LinearProgress as LinearProgress
import Material.Theme as Theme
import Material.Typography as Typography
import Messages exposing (Msg(..))
import Time exposing (Zone)


stepView step timezone =
  Grid.row [ Row.attrs [ Spacing.mt2 ] ]
  [ Grid.col []
    [ Card.card
      (Card.config |> Card.setOutlined True |> Card.setAttributes ( stepCardBackground step ))
      { blocks =
        Card.primaryAction [] [ stepHeading step, stepInformation step timezone ]
      , actions = stepActions step
      }
    ]
  ]


stepsListView recipe steps timezone =
  Html.div [ Spacing.pb5 ]
    [ Grid.row []
      [ Grid.col []
        [ Html.h4 [ Typography.headline4 ] [ Html.text ("Brewing " ++ recipe.name) ]
        , Html.p [ Typography.subtitle1 ] [ Html.text ((String.fromInt (List.length steps)) ++ " steps")]
        ]
      ]
    , Html.div [] (List.map (\step -> stepView step timezone) steps)
    ]

stepHeading : RecipeStep -> Block msg
stepHeading step =
  Card.block <|
    Html.div
      [ style "padding" "1rem" ]
      [ Html.h2
        [ Typography.headline6
        , style "margin" "0"
        ]
        [ text step.name ]
      , Html.h3
        [ Typography.subtitle2
        , style "margin" "0"
        ]
        [ text step.description ]
      ]

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


timeOfDay : Float -> Maybe Zone -> String
timeOfDay timestamp timezone =
  let
      time =
          Time.millisToPosix (Basics.round (timestamp * 1000))
      zone =
        case timezone of
          Nothing ->
            Time.utc
          Just tz ->
            tz
  in
    String.fromInt (Time.toHour zone time) ++ ":" ++ (if (Time.toMinute zone time) < 10 then
                                                        ("0" ++ (String.fromInt (Time.toMinute zone time)))
                                                      else (String.fromInt (Time.toMinute zone time)))

