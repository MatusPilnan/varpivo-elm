module Data.Step exposing (..)

type alias RecipeStep =
  { started : Maybe Float
  , finished : Maybe Float
  , progress : Maybe Float
  , estimation : Maybe Float
  , description : String
  , duration : Maybe Float
  , name : String
  , available : Bool
  }
