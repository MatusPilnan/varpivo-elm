module Recipes exposing (RecipeListEntry, recipeSelection)




import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Utilities.Spacing as Spacing
import Html
import Html.Attributes as Attributes
import Material.List as MatList
import Material.List.Item as ListItem
import Material.Typography as Typography
type alias RecipeListEntry = {
    name: String,
    id: String,
    style_type: String,
    style_name: String
    }


viewRecipeListEntry recipeListEntry =
    ListItem.text []
      { primary = [ Html.text recipeListEntry.name ]
      , secondary = [ Html.text (recipeListEntry.style_name ++ " - " ++ recipeListEntry.style_type) ]
      }

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
            (ListItem.listItem ListItem.config
                [ first ]
            )
            [ ListItem.listItem ListItem.config
                rest
            ]
      ]
    ]
  ]
