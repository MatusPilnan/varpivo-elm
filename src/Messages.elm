module Messages exposing (..)

import Browser
import Data.Recipe exposing (RecipeListEntry)
import Data.Step exposing (RecipeStep)
import Material.Snackbar as Snackbar
import Time exposing (Zone)
import Url


type DialogVariant = Scale | Confirm ( String, Msg)

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
  | SetSteps ( List RecipeStep )
  | ApiError String
  | ShowRecipeDetail RecipeListEntry
  | LinkClicked Browser.UrlRequest
  | NavigateTo String
  | UrlChanged Url.Url
  | RequestTimeZone
  | SetTimeZone Zone
  | SetBrewSession (RecipeListEntry, List RecipeStep)
  | MenuOpened
  | MenuClosed
