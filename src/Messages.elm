module Messages exposing (..)

import Browser
import Data.Recipe exposing (RecipeListEntry)
import Data.Step exposing (RecipeStep)
import Dict exposing (Dict)
import Material.Snackbar as Snackbar
import Time exposing (Zone)
import Url
import Url.Builder exposing (QueryParameter)


type DialogVariant = Scale | Confirm ( String, Msg ) | Calibration

type Msg = Increment
  | Decrement
  | FetchRecipes
  | SetAvailableRecipes (List RecipeListEntry)
  | Recv String
  | SnackbarClosed Snackbar.MessageId
  | Send
  | ShowDialog DialogVariant
  | CloseDialog (Maybe Msg)
  | SelectRecipe RecipeListEntry
  | SetSteps (Dict String RecipeStep , List String)
  | ShowSnackbar String
  | ShowRecipeDetail RecipeListEntry
  | LinkClicked Browser.UrlRequest
  | NavigateTo (List String, List QueryParameter)
  | UrlChanged Url.Url
  | RequestTimeZone
  | SetTimeZone Zone
  | SetBrewSession (Maybe RecipeListEntry, Dict String RecipeStep, List String)
  | StartStep String
  | UpdateStep RecipeStep
  | FinishStep String
  | CalibrationValueUpdate Int
  | StartCalibration
  | CalibrationWeightPlaced
  | TareScale
  | MenuOpened
  | MenuClosed
  | Multiple (List Msg)
  | CancelBrewSession
