module Messages exposing (..)

import Browser
import Data.Recipe exposing (BrewSessionData, RecipeListEntry)
import Data.Step exposing (RecipeStep)
import Dict exposing (Dict)
import Material.Snackbar as Snackbar
import Time exposing (Posix, Zone)
import Url
import Url.Builder exposing (QueryParameter)


type DialogVariant = Scale | Confirm ( String, Msg ) | Calibration | Security | Invite

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
  | SetTime Posix
  | SetBrewSession BrewSessionData
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
  | NewApiUrl String
  | SaveApiUrl (String, Bool)
  | RejectApiUrl (String, Bool)
  | SelectApiUrl String
  | RemoveApiUrl String
  | BrewSessionCodeInput String
  | BrewSessionCodeChange String
  | BrewSessionCodeVerified String
  | BrewSessionCodeRejected (String, Bool)
  | CheckingUrlsFromQuery
  | ToggleCodeSharing
  | ShareLink
  | BFImportInput String
  | ToggleRecipeReplace
  | ToggleRecipeAdd
  | ImportRecipe String
  | ImportRecipeSuccess RecipeListEntry
  | ImportRecipeFailure String
  | DeleteRecipe String
  | DeleteRecipeSuccess String
