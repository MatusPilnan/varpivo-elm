module Model exposing (..)


import Browser.Navigation exposing (Key)
import Data.Recipe exposing (RecipeListEntry)
import Data.Step exposing (RecipeStep)
import Dict exposing (Dict)
import Duration exposing (Duration)
import Material.Snackbar as Snackbar
import Messages exposing (DialogVariant, Msg)
import Router exposing (Route)
import Time exposing (Posix, Zone)
import Url exposing (Url)
type alias Model =
    { key : Key
    , url : Url
    , apiBaseUrl : String
    , basePath : String
    , basePathList : List String
    , title : String
    , value : Float
    , weight : Float
    , temperature : Float
    , heating : Bool
    , remainingBoilTime : Maybe Duration
    , boilStartedAt: Maybe Posix
    , availableRecipes : List RecipeListEntry
    , loading : Bool
    , snackbarQueue : Snackbar.Queue Msg
    , dialogVariant : Maybe DialogVariant
    , recipeSteps : Dict String RecipeStep
    , stepsOrder : List String
    , selectedRecipe : Maybe RecipeListEntry
    , timezone : Maybe Zone
    , menuOpened : Bool
    , calibrationValue : Int
    , route: Route
    }
