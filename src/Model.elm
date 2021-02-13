module Model exposing (..)


import Browser.Navigation exposing (Key)
import Data.BFImport exposing (BFImport, defaultBFImport)
import Data.Recipe exposing (RecipeListEntry)
import Data.Step exposing (RecipeStep)
import Dict exposing (Dict)
import Duration exposing (Duration)
import Json.Decode exposing (decodeString, list, string)
import Material.Snackbar as Snackbar
import Messages exposing (DialogVariant, Msg)
import Router exposing (Route(..))
import Time exposing (Posix, Zone)
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>))
import Url.Parser.Query as QueryParser


type alias Model =
    { key : Key
    , url : Url
    , apiBaseUrl : String
    , storedApiUrls: List String
    , newApiUrlFormError: Maybe String
    , apiConnecting: Bool
    , apiDefaultProtocol: String
    , selectedApiUrl: Maybe String
    , basePath : String
    , basePathList : List String
    , origin : String
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
    , security : BrewSessionSecurity
    , sharingSupported : Bool
    , bfImport : BFImport
    }

type alias BrewSessionSecurity =
  { code : String
  , valid : Bool
  , form :
    { value : String
    , valid : Bool
    , error : String
    , hint : String
    }
  , shareSecurityCode : Bool
  }

type alias Flags =
  { apiBaseUrl: String
  , basePath: String
  , storedApiUrls: List String
  , apiDefaultProtocol: String
  , brewSessionCode: String
  , origin: String
  , sharingSupported: Bool
  }

init : Flags -> Url -> Key -> Model
init flags url key =
  let
      apiUrlsInQuery =
          not <| List.isEmpty (getApiUrlsFromQueryString url)
  in

  { url = url
  , key = key
  , apiBaseUrl = flags.apiBaseUrl
  , storedApiUrls = flags.storedApiUrls
  , newApiUrlFormError = Nothing
  , apiConnecting = if apiUrlsInQuery then True else False
  , selectedApiUrl = Nothing
  , apiDefaultProtocol = flags.apiDefaultProtocol
  , basePath = flags.basePath
  , basePathList = List.filter (\val -> not (String.isEmpty val)) (String.split "/" flags.basePath)
  , origin = flags.origin
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
  , security = defaultSecurity url flags
  , sharingSupported = flags.sharingSupported
  , bfImport = defaultBFImport
  }

defaultSecurityFormState =
  { value = ""
  , valid = True
  , error = ""
  , hint = "Current brew session key"
  }


defaultSecurity : Url -> Flags -> BrewSessionSecurity
defaultSecurity url flags =
  let
      codeFromUrl =
          getBrewSessionKeyFromUrl url
  in
  { code = Maybe.withDefault flags.brewSessionCode codeFromUrl
  , valid =
    case codeFromUrl of
      Just _ ->
        True
      Nothing ->
        False
  , form = defaultSecurityFormState
  , shareSecurityCode = False
  }


getBrewSessionKeyFromUrl : Url -> Maybe String
getBrewSessionKeyFromUrl url =
  case Parser.parse (Parser.query (QueryParser.string "brewSessionCode")) {url | path = ""} of
   Just key ->
     key

   Nothing ->
     Nothing


getApiUrlsFromQueryString : Url -> List String
getApiUrlsFromQueryString url =
  let
    queryParser =
      Parser.query (QueryParser.string "connections")
  in
  case Parser.parse queryParser {url | path = ""} of
    Just urls ->
      Result.withDefault [] (decodeString (list string) (Maybe.withDefault "[]" urls))

    Nothing ->
      []
