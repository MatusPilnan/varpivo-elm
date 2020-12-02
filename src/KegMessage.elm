module KegMessage exposing (handleKegMessage)


import Api.Data exposing (recipeStepDecoder, wSKegDecoder)
import Data.Conversions exposing (apiStepToRecipeStep)
import Dict
import Json.Decode exposing (Error(..))
import Material.Snackbar as Snackbar
import Messages exposing (DialogVariant(..), Msg(..))


handleKegMessage data model console =
  case Json.Decode.decodeString wSKegDecoder data of
    Result.Ok value ->
      case value.content of
        "step" ->
          case Json.Decode.decodeString recipeStepDecoder value.payload of
            Result.Ok step ->
              ({ model | recipeSteps = (Dict.insert step.id ( apiStepToRecipeStep step) model.recipeSteps)}, console (Debug.toString step))

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

        "calibration" ->
          case value.payload of
            "ready" ->
              ( { model | dialogVariant = Just (Confirm ("Place calibration weight on the scale", CalibrationWeightPlaced)) }, Cmd.none )
            "done" ->
              ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message "Calibration done") model.snackbarQueue) }, Cmd.none)
            _ ->
              (model, console (Debug.toString value))
        "heater" ->
          case Json.Decode.decodeString Json.Decode.bool value.payload of
            Ok heater_on ->
              ( { model | heating = heater_on }, Cmd.none )

            Err error ->
              handleJsonDecodeError error model

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

