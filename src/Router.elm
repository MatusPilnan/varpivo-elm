module Router exposing (..)

import Browser.Navigation as Navigation
import Dict
import Url
import Url.Builder
import Url.Parser as Parser exposing ((<?>), Parser, map, oneOf, s, top)
import Url.Parser.Query as Query


type Route = Recipe | Home | BrewSession | Scale (Maybe String)

routeParser : Parser (Route -> a) a
routeParser =
  oneOf
    [ map Recipe (s "recipe")
    , map BrewSession (s "brew-session")
    , map Home top
    , map Scale (s "scale" <?> Query.string "step")
    ]


route url model console =
  case Parser.parse routeParser {url | path=String.replace model.basePath "" url.path} of
    Nothing ->
      ( { model | url = url , route = Home}, Cmd.batch [console (Url.toString url), navigate console model [""] []])

    Just currentPage ->
      case currentPage of
        Recipe ->
          case model.selectedRecipe of
            Nothing ->
              ( model, navigate console model [""] [])
            Just _ ->
              ( { model | url = url , route = currentPage}, console ("recipe " ++ Url.toString url))

        Home ->
          if Dict.isEmpty model.recipeSteps then
            ( { model | url = url, selectedRecipe = Nothing  , route = Home}, console ("home " ++ Url.toString url))
          else
            ( model, navigate console model ["brew-session"] [] )

        BrewSession ->
          if Dict.isEmpty model.recipeSteps then
            ( model, navigate console model [""] [] )
          else
            ( { model | url = url , route = currentPage}, console ("bs " ++ Url.toString url))

        Scale stepId ->
          ( { model | url = url, route = currentPage}, console (Debug.toString stepId) )


navigate : (String -> Cmd msg) -> { a | basePathList : List String, key : Navigation.Key } -> List String -> List Url.Builder.QueryParameter -> Cmd msg
navigate console model target query =
    --Cmd.batch [console (Url.Builder.absolute (model.basePathList ++ target) query)]
    Cmd.batch [console (Url.Builder.absolute (model.basePathList ++ target) query), Navigation.pushUrl model.key (Url.Builder.absolute (model.basePathList ++ target) query)]