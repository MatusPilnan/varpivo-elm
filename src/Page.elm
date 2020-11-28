module Page exposing (page)


import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Spacing as Spacing
import Dict
import Helpers exposing (center)
import Html exposing (text)
import Html.Attributes as Attributes
import Material.CircularProgress as CircularProgress
import Material.Typography as Typography
import Maybe
import Recipes exposing (recipeDetail, recipeSelection)
import Router exposing (routeParser)
import Scale exposing (scale)
import Steps exposing (stepsListView)
import Url.Parser as Parser


page model =
  case Parser.parse routeParser model.url of
    Nothing ->
      home model

    Just currentPage ->
      case ( currentPage, model.selectedRecipe ) of
        ( Router.Recipe, Nothing ) ->
          home model
        ( Router.Recipe, Just r ) ->
          recipeDetail r (Dict.isEmpty model.recipeSteps)
        ( Router.Home, _) ->
          home model
        ( Router.BrewSession, Nothing ) ->
          home model
        ( Router.BrewSession, Just r ) ->
          stepsListView r model.recipeSteps model.stepsOrder model.timezone
        ( Router.Scale stepId, _ ) ->
          scale model stepId



home model =
  if model.loading then loading else
    if List.isEmpty model.availableRecipes then noRecipes else recipeSelection model.availableRecipes


loading =
  Html.div [ Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyCenter, center ]
    [ Html.h4 [ Typography.headline4 ] [ text "Loading recipes" ]
    , CircularProgress.indeterminate (CircularProgress.config |> CircularProgress.setFourColored True)
    ]

noRecipes =
  Html.div [ center, Attributes.align "center", Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyCenter ]
  [ Html.h4 [ Typography.headline4, Spacing.p2 ] [ text "We couldn't find any recipes!" ]
  , Html.h4 [ Typography.headline4, Spacing.p2 ] [ text "\u{1F631} \u{1F625}" ]
  ]


