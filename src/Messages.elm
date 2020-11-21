module Messages exposing (..)

import Data.Recipe exposing (RecipeListEntry)
import Data.Step exposing (RecipeStep)
import Material.Snackbar as Snackbar


type DialogVariant = Scale | Confirm ( String, Msg)

type Msg = Increment
  | Decrement
  | ToggleLoading
  | ListAppend (List RecipeListEntry)
  | Recv String
  | SnackbarClosed Snackbar.MessageId
  | Send
  | ShowDialog DialogVariant
  | CloseDialog (Maybe Msg)
  | SelectRecipe String
  | SetSteps ( List RecipeStep )
  | ApiError String
