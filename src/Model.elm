module Model exposing (..)


import Browser.Navigation exposing (Key)
import Data.Recipe exposing (RecipeListEntry)
import Data.Step exposing (RecipeStep)
import Dict exposing (Dict)
import Duration exposing (Duration)
import Material.Snackbar as Snackbar
import Messages exposing (DialogVariant, Msg)
import Router exposing (Route(..))
import Time exposing (Posix, Zone)
import Url exposing (Url)
type alias Model =
    { key : Key
    , url : Url
    , apiBaseUrl : String
    , storedApiUrls: List String
    , newApiUrlFormError: Maybe String
    , apiConnecting: Bool
    , selectedApiUrl: Maybe String
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

init : {apiBaseUrl: String, basePath: String, storedApiUrls: List String} -> Url -> Key -> Model
init flags url key =
  { url = url
    , key = key
    , apiBaseUrl = flags.apiBaseUrl
    , storedApiUrls = flags.storedApiUrls
    , newApiUrlFormError = Nothing
    , apiConnecting = False
    , selectedApiUrl = Nothing
    , basePath = flags.basePath
    , basePathList = List.filter (\val -> not (String.isEmpty val)) (String.split "/" flags.basePath)
    , title = "Var:Pivo"
    , value = 0
    , weight = 0
    , temperature = 0
    , heating = False
    , remainingBoilTime = Nothing
    , availableRecipes = []
    , loading = True
    , snackbarQueue = Snackbar.initialQueue
    , dialogVariant = Nothing
    , recipeSteps = Dict.empty
    , stepsOrder = []
    , selectedRecipe = Nothing
    , timezone = Nothing
    , menuOpened = False
    , calibrationValue = -1
    , route = Home
    , boilStartedAt = Nothing
    }
