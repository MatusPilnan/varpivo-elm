module Router exposing (..)

import Browser.Navigation as Navigation
import Url.Builder
import Url.Parser as Parser exposing (Parser, map, oneOf, s)


type Route = Recipe | Home | BrewSession

routeParser : Parser (Route -> a) a
routeParser =
  oneOf
    [ map Recipe (s "recipe")
    , map BrewSession (s "brew-session")
    , map Home (s "")
    ]


route url model =
  case Parser.parse routeParser url of
    Nothing ->
      ( { model | url = url }, Cmd.none)

    Just currentPage ->
      case currentPage of
        Recipe ->
          case model.selectedRecipe of
            Nothing ->
              ( model, Navigation.replaceUrl model.key (Url.Builder.absolute [""] []))
            Just _ ->
              ( { model | url = url }, Cmd.none)

        Home ->
          if List.isEmpty model.recipeSteps then
            ( { model | url = url, selectedRecipe = Nothing }, Cmd.none)
          else
            ( model, Navigation.replaceUrl model.key (Url.Builder.absolute ["brew-session"] []) )

        BrewSession ->
          if List.isEmpty model.recipeSteps then
            ( model, Navigation.replaceUrl model.key (Url.Builder.absolute [""] []) )
          else
            ( { model | url = url }, Cmd.none)
