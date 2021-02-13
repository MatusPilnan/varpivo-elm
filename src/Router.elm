module Router exposing (..)

import Browser.Navigation as Navigation
import Data.BFImport exposing (defaultBFImport)
import Dict
import Url
import Url.Builder
import Url.Parser as Parser exposing ((<?>), Parser, map, oneOf, s, top)
import Url.Parser.Query as Query


type Route = Recipe | Home | BrewSession | Scale (Maybe String) | Connections | RecipeImport

routeParser : Parser (Route -> a) a
routeParser =
  oneOf
    [ map RecipeImport (s "import")
    , map Recipe (s "recipe")
    , map BrewSession (s "brew-session")
    , map Home top
    , map Scale (s "scale" <?> Query.string "step")
    , map Connections (s "connections")
    ]


route url model console =
  case Parser.parse routeParser {url | path=String.replace model.basePath "" url.path} of
    Nothing ->
      ( { model | url = url , route = Home}, Cmd.batch [console (Url.toString url), navigate model [""] []])

    Just currentPage ->
      if model.apiBaseUrl == "" && currentPage /= Connections
      then ( model, navigate model ["connections"] [] )
      else
      case currentPage of
        Recipe ->
          case model.selectedRecipe of
            Nothing ->
              ( model, navigate model [""] [])
            Just _ ->
              ( { model | url = url , route = currentPage}, console ("recipe " ++ Url.toString url))

        Home ->
          if Dict.isEmpty model.recipeSteps then
            ( { model | url = url, selectedRecipe = Nothing  , route = Home}, console ("home " ++ Url.toString url))
          else
            ( model, navigate model ["brew-session"] [] )

        BrewSession ->
          if Dict.isEmpty model.recipeSteps then
            ( model, navigate model [""] [] )
          else
            ( { model | url = url , route = currentPage}, console ("bs " ++ Url.toString url))

        Scale stepId ->
          ( { model | url = url, route = currentPage}, console (Debug.toString stepId) )

        Connections ->
          ( { model | url = url, route = currentPage, newApiUrlFormError = Nothing}, Cmd.none )

        RecipeImport ->
          ( { model | url = url, route = currentPage, bfImport = defaultBFImport }, Cmd.none )


navigate : { a | basePathList : List String, key : Navigation.Key } -> List String -> List Url.Builder.QueryParameter -> Cmd msg
navigate model target query =
    Navigation.pushUrl model.key (Url.Builder.absolute (model.basePathList ++ target) query)
