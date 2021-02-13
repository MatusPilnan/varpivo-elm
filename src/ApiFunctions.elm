module ApiFunctions exposing (..)

import Api exposing (send)
import Api.Data exposing (BrewSession, BrewerSFriendRecipeID, Recipe, RecipeList, StepsList)
import Api.Request.BrewSessionStatus as BrewStatusApi
import Api.Request.Info as InfoApi
import Api.Request.RecipeSteps as RecipeStepsApi
import Api.Request.Recipes as RecipesApi
import Api.Request.Scale as ScaleApi
import Data.Conversions exposing (apiRecipeToRecipe, apiStepListToStepList, apiStepToRecipeStep)
import Data.Recipe exposing (BrewSessionData, RecipeListEntry)
import Data.Step exposing (RecipeStep)
import Dict exposing (Dict)
import Http exposing (Error(..))
import Messages exposing (Msg(..))
import Result


verifyBrewSessionCode : String -> String -> Cmd Msg
verifyBrewSessionCode brewSessionCode basePath =
  send
  ( \response ->
    case response of
      Ok _ ->
        BrewSessionCodeVerified brewSessionCode
      Err e ->
        case e of
          BadStatus code ->
            case code of
              401 ->
                BrewSessionCodeRejected ("Invalid code", False)
              _ ->
                BrewSessionCodeRejected ("Code couldn't be verified", False)
          _ ->
            BrewSessionCodeRejected ("Code couldn't be verified", False)

  ) (Api.withBasePath basePath (InfoApi.getAuth ( Just brewSessionCode ) ) )


checkApiUrl : String -> Bool -> Cmd Msg
checkApiUrl basePath autoCheck =
  send (\response -> case response of
                       Ok _ ->
                         SaveApiUrl (basePath, autoCheck)
                       Err e ->
                         case e of
                           BadStatus code ->
                             case code of
                               404 ->
                                 RejectApiUrl ("No Var:Pivo server found on that address", autoCheck)
                               _ ->
                                 RejectApiUrl ("Unknown error " ++ Debug.toString e, autoCheck)
                           NetworkError ->
                             RejectApiUrl ("Could not connect to that address", autoCheck)
                           _ ->
                             RejectApiUrl ("Unknown error " ++ Debug.toString e, autoCheck)

                      ) (Api.withBasePath basePath (InfoApi.getDiscover))

handleSteps: Result Http.Error StepsList -> (Dict String RecipeStep, List String)
handleSteps res = case res of
                Ok value ->
                  apiStepListToStepList value
                Err _ ->
                  (Dict.empty, [])

handleRecipes: Result Http.Error RecipeList -> List RecipeListEntry
handleRecipes res = case res of
                Ok value -> List.map apiRecipeToRecipe value.recipes
                Err _ -> []



fetchRecipeSteps: String -> String -> Cmd Msg
fetchRecipeSteps recipeId basePath = send ( \msg ->
  let
      (steps, order) =
          handleSteps msg
  in
    if Dict.isEmpty steps then
      ShowSnackbar "Couldn't get recipe steps!"
    else
      SetSteps (steps, order)) (Api.withBasePath basePath (RecipesApi.postRecipe recipeId))

fetchRecipes: String -> Cmd Msg
fetchRecipes basePath = send (\msg -> SetAvailableRecipes (handleRecipes msg)) (Api.withBasePath basePath RecipesApi.getRecipeList)


handleBrewSession: Result Http.Error BrewSession -> Maybe (BrewSessionData)
handleBrewSession response =
  case response of
    Ok value ->
      Just ( { recipeListEntry = Just (apiRecipeToRecipe value.recipe)
           , steps = Dict.fromList (List.map (\step -> (step.id, apiStepToRecipeStep step)) value.steps)
           , stepIds = List.map (\step -> step.id) value.steps
           , boilStartedAt = Maybe.map round value.boilStartedAt
           , brewSessionCodeValid = value.bsCodeValid
           })
    Err _ ->
      Nothing


fetchBrewSession brewSessionCode basePath =
  send (\response -> case (handleBrewSession response) of
                       Nothing ->
                         FetchRecipes
                       Just result ->
                         SetBrewSession result
                     ) (Api.withBasePath basePath (BrewStatusApi.getBrewStatus (Just brewSessionCode)))

cancelBrewSession brewSessionCode basePath =
  send (\response -> case response of
                              Ok _ ->
                                SetBrewSession ({ recipeListEntry = Nothing
                                                , steps = Dict.empty
                                                , stepIds = []
                                                , boilStartedAt = Nothing
                                                , brewSessionCodeValid = True
                                                })
                              Err e ->
                                handleApiError e
                            ) (Api.withBasePath basePath (BrewStatusApi.deleteBrewStatus (Just brewSessionCode)))

handleStep : Result.Result Error Api.Data.RecipeStep -> Msg
handleStep response =
  case response of
    Ok value ->
      UpdateStep (apiStepToRecipeStep value)
    Err e ->
      handleApiError e

handleApiError e =
  case e of
    BadStatus code ->
      case code of
        401 ->
          BrewSessionCodeRejected ("You are in spectator mode! Add brew session key to gain control.", True)
        _ ->
          ShowSnackbar (Debug.toString e)
    _ ->
      ShowSnackbar (Debug.toString e)

startStep : String -> String -> String -> Cmd Msg
startStep stepId brewSessionCode basePath =
  send handleStep (Api.withBasePath basePath (RecipeStepsApi.postStepStart stepId (Just brewSessionCode)))

finishStep : String -> String -> String -> Cmd Msg
finishStep stepId brewSessionCode basePath =
    send handleStep (Api.withBasePath basePath (RecipeStepsApi.deleteStepStart stepId (Just brewSessionCode)))

startCalibration : Int -> String -> String -> Cmd Msg
startCalibration grams brewSessionCode basePath=
  send (\response ->
         case response of
           Ok _ ->
             ShowSnackbar "Scale calibration started"
           Err e ->
             handleApiError e
       ) (Api.withBasePath basePath (ScaleApi.patchScaleRes grams (Just brewSessionCode)))


calibrate : String -> String -> Cmd Msg
calibrate brewSessionCode basePath =
  send (\response ->
          case response of
            Ok _ ->
              ShowSnackbar "Calibration in progress. Do not move the weight."
            Err e ->
              handleApiError e
        ) (Api.withBasePath basePath (ScaleApi.putScaleRes (Just brewSessionCode) ))


tareScale : String -> String -> Cmd Msg
tareScale brewSessionCode basePath =
  send (\response ->
          case response of
            Ok _ ->
              ShowSnackbar "Tare done"
            Err e ->
              handleApiError e
        ) (Api.withBasePath basePath (ScaleApi.deleteScaleRes (Just brewSessionCode)))

importBrewersFriend : String -> Maybe String -> Maybe String -> Bool -> Bool -> Cmd Msg
importBrewersFriend basePath recipeId recipeUrl replace add =
  let
      requestBody : BrewerSFriendRecipeID
      requestBody =
        { id = recipeId
        , url = recipeUrl
        , replace = Just replace
        , add = Just add
        }

  in
  send (\response ->
      case response of
        Ok r ->
          ImportRecipeSuccess (apiRecipeToRecipe r)

        Err e ->
          ImportRecipeFailure (
            case e of
              BadStatus code ->
                case code of
                  400 ->
                    "You have to enter Brewer's Friend ID or URL"
                  403 ->
                    "Recipe is not accessible. Are you sure it's set to public?"
                  404 ->
                    "Recipe not found."
                  409 ->
                    "Recipe already exists. Specify if you want to replace it or add another copy, and try again."
                  _ ->
                    "Import failed."

              _ ->
                "Import failed."
            )

       ) (Api.withBasePath basePath (RecipesApi.postBrewersFriendRecipe (Just requestBody)))
