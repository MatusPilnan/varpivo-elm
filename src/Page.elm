module Page exposing (page)


import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Size as Size
import Bootstrap.Utilities.Spacing as Spacing
import Html exposing (text)
import Html.Attributes as Attributes
import Material.CircularProgress as CircularProgress
import Material.Typography as Typography
import Recipes exposing (recipeSelection)


page model =
  if model.loading then loading else
    if List.isEmpty model.availableRecipes then noRecipes else recipeSelection model.availableRecipes



loading =
  Html.div [ Size.h50, Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyAround ]
    [ Html.h4 [ Typography.headline4 ] [ text "Loading recipes" ]
    , CircularProgress.indeterminate (CircularProgress.config |> CircularProgress.setFourColored True)
    ]

noRecipes =
  Html.div [ Attributes.align "center", Size.h75, Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyCenter ]
  [ Html.h4 [ Typography.headline4, Spacing.p2 ] [ text "We couldn't find any recipes!" ]
  , Html.h4 [ Typography.headline4, Spacing.p2 ] [ text "\u{1F631} \u{1F625}" ]
  ]



