module KegMessage exposing (handleKegMessage)


import Api.Data exposing (recipeStepDecoder, wSKegDecoder)
import Data.Conversions exposing (apiStepToRecipeStep)
import Dict
import Json.Decode exposing (Error(..))
import Material.Snackbar as Snackbar


handleKegMessage data model =
  case Json.Decode.decodeString wSKegDecoder data of
    Result.Ok value ->
      case value.content of
        "step" ->
          case Json.Decode.decodeString recipeStepDecoder value.payload of
            Result.Ok step ->
              ({ model | recipeSteps = (Dict.insert step.id ( apiStepToRecipeStep step) model.recipeSteps)}, Cmd.none)

            Result.Err e ->
              handleJsonDecodeError e model
        "weight" ->
          case Json.Decode.decodeString Json.Decode.float value.payload of
            Result.Ok weight ->
              ({model | weight = weight}, Cmd.none)

            Result.Err e ->
              handleJsonDecodeError e model

        "temperature" ->
          case Json.Decode.decodeString Json.Decode.float value.payload of
            Result.Ok temp ->
              ({model | temperature = temp}, Cmd.none)
            Result.Err e ->
              handleJsonDecodeError e model

        "boilTime" ->
          case Json.Decode.decodeString Json.Decode.int value.payload of
            Result.Ok boil ->
              ({model | remainingBoilTime = boil}, Cmd.none)
            Result.Err e ->
              handleJsonDecodeError e model

        _ ->
          ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message value.payload) model.snackbarQueue) }, Cmd.none)
    Result.Err e ->
      handleJsonDecodeError e model



handleJsonDecodeError e model =
  case e of
    Field string _ ->
       ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message string) model.snackbarQueue) }, Cmd.none)

    Index int _ ->
       ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message (String.fromInt int)) model.snackbarQueue) }, Cmd.none)

    OneOf _ ->
       ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message "oneof errors") model.snackbarQueue) }, Cmd.none)

    Failure string _ ->
       ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message string) model.snackbarQueue) }, Cmd.none)

