module Data.Recipe exposing (..)

type alias RecipeListEntry = {
    name: String,
    id: String,
    style_type: String,
    style_name: String,
    ingredients: List {
      name: String,
      amount: Float,
      unit: String
      }
    }
