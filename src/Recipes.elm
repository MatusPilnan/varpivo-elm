module Recipes exposing (recipeSelection, recipeDetail)




import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Utilities.Spacing as Spacing
import Bootstrap.Utilities.Size as Size
import Data.Recipe exposing (RecipeListEntry)
import Html exposing (Html)
import Html.Attributes as Attributes exposing (style)
import Html.Events
import Json.Decode as Decode
import Material.DataTable as DataTable exposing (Cell)
import Material.Fab.Extended as ExtendedFab
import Material.IconButton as IconButton
import Material.List as MatList
import Material.List.Item as ListItem
import Material.Theme as Theme
import Material.Typography as Typography
import Messages exposing (DialogVariant(..), Msg(..))
import Round



viewRecipeListEntry recipeListEntry =
  ListItem.listItem (ListItem.config |> ListItem.setOnClick  (ShowRecipeDetail recipeListEntry))
    [ ListItem.text []
      { primary = [ Html.text recipeListEntry.name ]
      , secondary = [ Html.text (recipeListEntry.style_name ++ " - " ++ recipeListEntry.style_type) ]
      }
    , ListItem.meta []
      [ IconButton.iconButton
        ( IconButton.config
          |> IconButton.setAttributes
                 [ Html.Events.stopPropagationOn "click" (Decode.succeed
                 ( ShowDialog <| Confirm ( "Are you sure you want to permanently remove " ++ recipeListEntry.name ++ "? This can't be undone!" , DeleteRecipe recipeListEntry.id), True))]
          )
        ( IconButton.icon "delete") ]
    ]

recipeSelection : List RecipeListEntry -> Html Msg
recipeSelection recipes =
  let
      recipeListItems =
          List.map viewRecipeListEntry recipes
  in
  Html.div []
  [ Grid.row [ Row.attrs [ Spacing.pt2 ] ]
    [ Grid.col []
      [ Html.h4 [Typography.headline4 ] [Html.text "What are we brewing?"]]
    ]
  , Grid.row []
    [ Grid.col [ Col.attrs [ Spacing.pt3 ] ]
      [ case recipeListItems of
        [] -> Html.div [] []
        first :: rest ->
          MatList.list
            (MatList.config
              |> MatList.setTwoLine True
              |> MatList.setAttributes [ Attributes.style "max-width" "600px", Attributes.style "border" "1px solid rgba(0,0,0,.1)" ])
            ( first )  rest
      ]
    ]
  ]

recipeDetail recipe brewable =
  Html.div [ Spacing.pb5 ]
  [ Grid.row []
    [ Grid.col []
      [ Html.h4 [ Typography.headline4 ] [ Html.text recipe.name ]
      , Html.p [ Typography.subtitle1 ] [ Html.text (recipe.style_type ++ " - " ++ recipe.style_name)]
      ]
    ]
  , Grid.row []
    [ Grid.col []
      [ Html.h5 [ Typography.headline5 ] [ Html.text "Ingredients" ] ]
    ]
  , Grid.row []
    [ Grid.col []
      [ DataTable.dataTable ( DataTable.config  |> DataTable.setAttributes [Size.w100] )
        { thead =
            [ DataTable.row []
                [ DataTable.cell [] [ Html.text "Ingredient" ]
                , DataTable.cell [] [ Html.text "Amount" ]
                --, DataTable.cell [] []
                ]
            ]
        , tbody =
           (List.map (\ingredient -> ingredientView ingredient) recipe.ingredients)
        }
      ]
    ]
  , if brewable then ExtendedFab.fab (ExtendedFab.config
      |> ExtendedFab.setAttributes
        [ style "position" "fixed"
        , style "bottom" "2rem"
        , style "right" "2rem"
        , Theme.primaryBg
        ]
      |> ExtendedFab.setOnClick (ShowDialog (Confirm ("You are about to start brewing " ++ recipe.name, SelectRecipe recipe))))  "Brew!"
    else Html.div [] []
  ]

--ingredientView : {name: string, unit: string, amount: float} -> Cell msg
ingredientView ingredient =
  DataTable.row []
   [ DataTable.cell [] [Html.text ingredient.name]
   , DataTable.cell [] [Html.text (Round.round 2 ingredient.amount ++ " " ++ ingredient.unit)]
   --, DataTable.checkboxCell [] Checkbox.config
   ]

