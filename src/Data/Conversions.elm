module Data.Conversions exposing (..)


import Api.Data exposing (StepsList)
import Data.Recipe exposing (RecipeListEntry)
import Data.Step exposing (RecipeStep, StepKind(..))
import Dict exposing (Dict)


apiRecipeToRecipe : Api.Data.Recipe -> RecipeListEntry
apiRecipeToRecipe a =
  { name = a.name
  , style_type = a.style.type_
  , style_name = a.style.name
  , id = a.id
  , ingredients = List.map (\i -> {name = i.name, unit = i.unit, amount = i.amount}) a.ingredients
  }


apiStepToRecipeStep : Api.Data.RecipeStep -> RecipeStep
apiStepToRecipeStep entry =
  { started = entry.started
  , finished = entry.finished
  , progress = entry.progress
  , estimation = entry.estimation
  , description = entry.description
  , duration = entry.durationMins
  , name = entry.name
  , available = entry.available
  , id = entry.id
  , target = entry.target
  , kind = (case entry.kind of
               "generic" ->
                 Generic
               "hop" ->
                 Hop
               "misc" ->
                 Misc
               "set_temperature" ->
                 SetTemperature
               "keep_temperature" ->
                 KeepTemperature
               "water" ->
                 Water
               "weight" ->
                 Weight
               _ ->
                 Generic

             )
  }

apiStepListToStepList : Api.Data.StepsList -> (Dict String RecipeStep, List String)
apiStepListToStepList value =
  (Dict.fromList (List.map (\step -> (step.id, apiStepToRecipeStep step)) value.steps), List.map (\step -> step.id) value.steps)
