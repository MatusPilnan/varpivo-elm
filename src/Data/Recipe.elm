module Data.Recipe exposing (..)

import Data.Step exposing (RecipeStep)
import Dict exposing (Dict)
type alias RecipeListEntry = {
    name: String,
    id: String,
    style_type: String,
    style_name: String,
    ingredients: List {
      name: String,
      amount: Float,
      unit: String
      },
    boil_time: Maybe Float
    }

type alias BrewSessionData =
    {
    recipeListEntry: Maybe RecipeListEntry
    , steps: Dict String RecipeStep
    , stepIds: List String
    , boilStartedAt: Maybe Int
    }