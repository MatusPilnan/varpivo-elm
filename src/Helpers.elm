module Helpers exposing (..)

import Data.Step exposing (RecipeStep)
import Html exposing (Attribute)
import Html.Attributes as Attributes
import Time exposing (Zone)



center : Attribute msg
center =
  Attributes.class "varpivo-centered-page"


timeOfDay : Float -> Maybe Zone -> String
timeOfDay timestamp timezone =
  let
      time =
          Time.millisToPosix (Basics.round (timestamp * 1000))
      zone =
        case timezone of
          Nothing ->
            Time.utc
          Just tz ->
            tz
  in
    String.fromInt (Time.toHour zone time) ++ ":" ++ (if (Time.toMinute zone time) < 10 then
                                                        ("0" ++ (String.fromInt (Time.toMinute zone time)))
                                                      else (String.fromInt (Time.toMinute zone time)))


availableSteps : List RecipeStep -> Int
availableSteps steps =
  List.length (List.filter .available steps)
