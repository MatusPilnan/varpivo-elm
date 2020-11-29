module Data.Step exposing (..)

type StepKind = Generic
  | Water
  | Weight
  | KeepTemperature
  | SetTemperature
  | Hop
  | Misc

type alias RecipeStep =
  { started : Maybe Float
  , finished : Maybe Float
  , progress : Maybe Float
  , estimation : Maybe Float
  , description : String
  , duration : Maybe Float
  , name : String
  , available : Bool
  , id : String
  , target : Maybe Float
  , kind : StepKind
  }


empty : RecipeStep
empty =
  { started = Nothing
  , finished = Nothing
  , progress = Nothing
  , estimation = Nothing
  , description = ""
  , duration = Nothing
  , name = ""
  , available = False
  , id = ""
  , target = Nothing
  , kind = Generic
  }
