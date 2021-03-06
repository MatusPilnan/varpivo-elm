module Page exposing (page)


import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Spacing as Spacing
import ConnectionsManagement exposing (noApiUrl)
import Dict
import Helpers exposing (center)
import Html exposing (Html, text)
import Html.Attributes as Attributes
import Material.Button as Button
import Material.CircularProgress as CircularProgress
import Material.Typography as Typography
import Maybe
import Messages exposing (Msg(..))
import Model exposing (Model)
import RecipeImport exposing (brewersFriendImport)
import Recipes exposing (recipeDetail, recipeSelection)
import Router
import Scale exposing (scale)
import Steps exposing (stepsListView)

page : Model -> Html Msg
page model =
  if model.apiBaseUrl == ""
  then noApiUrl model
  else case ( model.route, model.selectedRecipe ) of
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
    ( Router.Connections, _) ->
      noApiUrl model
    ( Router.RecipeImport, _ ) ->
      brewersFriendImport model



home : Model -> Html Msg
home model =
  if model.loading then loading else
    if List.isEmpty model.availableRecipes then noRecipes model else recipeSelection model.availableRecipes


loading : Html msg
loading =
  Html.div [ Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyCenter, center ]
    [ Html.h4 [ Typography.headline4 ] [ text "Loading recipes" ]
    , CircularProgress.indeterminate (CircularProgress.config |> CircularProgress.setFourColored True)
    ]

noRecipes : Model -> Html Msg
noRecipes model =
  Html.div [ center, Attributes.align "center", Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyCenter ]
  [ Html.h4 [ Typography.headline4, Spacing.p2 ] [ text "We couldn't find any recipes!" ]
  , Html.h4 [ Typography.headline4, Spacing.p2 ] [ text "\u{1F631} \u{1F625}" ]
  , Html.p [ Typography.body2, Spacing.mt5 ] [text ("Connecting to " ++ model.apiBaseUrl)]
  , Button.outlined (Button.config |> Button.setOnClick (NavigateTo (["connections"], [])))"Manage connections"
  ]


