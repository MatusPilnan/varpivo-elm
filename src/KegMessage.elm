module KegMessage exposing (handleKegMessage)


import Api.Data exposing (recipeStepDecoder, temperatureDecoder, wSKegDecoder)
import Data.Conversions exposing (apiStepToRecipeStep)
import Data.Step exposing (RecipeStep)
import Dict
import Json.Decode exposing (Error(..))
import Material.Snackbar as Snackbar
import Maybe exposing (withDefault)
import Messages exposing (DialogVariant(..), Msg(..))
import Time


handleKegMessage data model console notificationPort =
  case Json.Decode.decodeString wSKegDecoder data of
    Result.Ok value ->
      case value.content of
        "step" ->
          case Json.Decode.decodeString recipeStepDecoder value.payload of
            Result.Ok step ->
              handleStepChange model (apiStepToRecipeStep step) notificationPort

            Result.Err e ->
              handleJsonDecodeError e model
        "weight" ->
          case Json.Decode.decodeString Json.Decode.float value.payload of
            Result.Ok weight ->
              ({model | weight = weight}, Cmd.none)

            Result.Err e ->
              handleJsonDecodeError e model

        "temperature" ->
          case Json.Decode.decodeString temperatureDecoder value.payload of
            Result.Ok temp ->
              ({model | temperature = temp.temperature, heating = temp.heating}, Cmd.none)
            Result.Err e ->
              handleJsonDecodeError e model

        "boil_finished_at" ->
          case Json.Decode.decodeString Json.Decode.int value.payload of
            Result.Ok boil ->
              ({model | boilEndEstimation = Maybe.Just (Time.millisToPosix boil)}, Cmd.none)
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
        _ ->
          ({model | snackbarQueue = (Snackbar.addMessage (Snackbar.message value.payload) model.snackbarQueue) }, Cmd.none)
    Result.Err e ->
      handleJsonDecodeError e model

handleStepChange model newStep notificationPort =
  let
      oldStep =
          withDefault Data.Step.empty (Dict.get newStep.id model.recipeSteps)
      newModel =
        { model | recipeSteps = (Dict.insert newStep.id newStep model.recipeSteps)}
  in
    case (newStep.started, newStep.finished) of
      (Just _, Just newFinished) ->
        case (oldStep.finished) of
          (Nothing) ->
            (newModel, notificationPort {title = "Step finished", subtitle = newStep.name, time = newFinished * 1000})
          (_) ->
            (newModel, Cmd.none)
      (Just newStarted, Nothing) ->
        case (oldStep.started) of
          (Nothing) ->
            (newModel, notificationPort {title = newStep.name, subtitle = newStep.description, time = newStarted * 1000})
          (Just _) ->
            (newModel, Cmd.none)
      (_, _) ->
        (newModel, Cmd.none)



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

