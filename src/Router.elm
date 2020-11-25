module Router exposing (..)

import Browser.Navigation as Navigation
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
  case Parser.parse routeParser url of
    Nothing ->
      ( { model | url = url }, Cmd.batch [console (Url.toString url), Navigation.pushUrl model.key (Url.Builder.absolute [""] [])])

    Just currentPage ->
      case currentPage of
        Recipe ->
          case model.selectedRecipe of
            Nothing ->
              ( model, Navigation.pushUrl model.key (Url.Builder.absolute [""] []))
            Just _ ->
              ( { model | url = url }, console ("recipe " ++ Url.toString url))

        Home ->
          if List.isEmpty model.recipeSteps then
            ( { model | url = url, selectedRecipe = Nothing }, console ("home " ++ Url.toString url))
          else
            ( model, Navigation.pushUrl model.key (Url.Builder.absolute ["brew-session"] []) )

        BrewSession ->
          if List.isEmpty model.recipeSteps then
            ( model, Navigation.pushUrl model.key (Url.Builder.absolute [""] []) )
          else
            ( { model | url = url }, console ("bs " ++ Url.toString url))

        Scale stepId ->
          ( { model | url = url}, console (Debug.toString stepId) )

