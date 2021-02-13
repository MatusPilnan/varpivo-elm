module RecipeImport exposing (..)

import Bootstrap.Alert as Alert
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Size as Size
import Bootstrap.Utilities.Spacing as Spacing
import Html exposing (text)
import Html.Attributes as Attributes
import Material.Button as Button
import Material.CircularProgress as CircularProgress
import Material.HelperText as HelperText
import Material.Switch as Switch
import Material.TextField as TextField
import Material.Typography as Typography
import Messages exposing (Msg(..))
import Model exposing (Model)


brewersFriendImport : Model -> Html.Html Msg
brewersFriendImport model =
  Html.div [ Spacing.pb5 ]
  [ Grid.row []
    [ Grid.col []
      [ Html.h2 [ Typography.headline4 ] [ text "Import from Brewer's Friend" ]
      , Html.p [ Typography.body1 ] [ text "Import your Brewer's Friend recipe by entering it's ID, or the URL (link)."]
      , Html.p [ Typography.body1 ] [ text "The recipe has to be public."]
      ]
    ]
  , Grid.row []
    [ Grid.col []
      [ TextField.filled
        ( TextField.config
          |> TextField.setLabel (Just "Recipe ID or link")
          |> TextField.setRequired True
          |> TextField.setValue (Just model.bfImport.form.value)
          |> TextField.setOnInput BFImportInput
          |> TextField.setValid model.bfImport.form.valid
          |> TextField.setAttributes [ Size.w100 ]
        )
      , HelperText.helperLine []
        [ HelperText.helperText
          ( HelperText.config
            |> HelperText.setPersistent True
            |> HelperText.setValidation (not model.bfImport.form.valid)
          ) (if model.bfImport.form.valid then model.bfImport.form.hint else model.bfImport.form.error)]
      ]
    ]
  , Grid.row [ Row.attrs [ Spacing.mt2 ] ]
    [ Grid.col [ Col.attrs [Flex.block, Flex.row, Flex.alignItemsCenter, Flex.justifyEnd] ]
      [ CircularProgress.indeterminate
        ( CircularProgress.config
          |> CircularProgress.setFourColored True
          |> CircularProgress.setClosed ( not model.bfImport.importing )
          |> CircularProgress.setSize CircularProgress.medium
          |> CircularProgress.setAttributes [ Spacing.mr3 ]
        )
      , Button.raised (Button.config
        |> Button.setOnClick (ImportRecipe model.bfImport.form.value)
        |> Button.setDisabled (not model.bfImport.form.valid || String.isEmpty model.bfImport.form.value) )
        "Import"
      ]
    ]
  , Grid.row [ Row.attrs [ Flex.block, Flex.row, Flex.alignItemsCenter, Flex.justifyEnd] ]
    [ Grid.col []
      [ Html.p [ Typography.body1, Spacing.my4 ] [ Html.text "Replace recipe if it already exists" ]
      ]
    , Grid.col [ Col.attrs [ Attributes.align "center" ], Col.middleXs, Col.xs3  ]
      [ Switch.switch
        ( Switch.config
          |> Switch.setChecked model.bfImport.replace
          |> Switch.setOnChange ToggleRecipeReplace
          |> Switch.setAttributes [ Spacing.my2 ]
        )
      ]
    ]
  , Grid.row [ Row.attrs [ Flex.block, Flex.row, Flex.alignItemsCenter, Flex.justifyEnd] ]
    [ Grid.col []
      [ Html.p [ Typography.body1, Spacing.my2 ] [ Html.text "Add recipe again even if it already exists" ]
      ]
    , Grid.col [ Col.attrs [ Attributes.align "center" ], Col.middleXs, Col.xs3  ]
      [ Switch.switch
        ( Switch.config
          |> Switch.setChecked model.bfImport.add
          |> Switch.setOnChange ToggleRecipeAdd
        )
      ]
    ]
  , Grid.row []
    [ Grid.col []
      [ if not <| String.isEmpty model.bfImport.successMessage
        then Alert.simpleSuccess [] [ text model.bfImport.successMessage ]
        else Html.div [] []
      , if not <| String.isEmpty model.bfImport.errorMessage
        then Alert.simpleDanger [] [ text model.bfImport.errorMessage ]
        else Html.div [] []
      ]
    ]
  , Grid.row [ Row.attrs [ ] ]
    [ Grid.col []
      [ Html.p [ Typography.subtitle2, Spacing.mb0 ] [ Html.text "Hint: Where to find the ID?" ]
      ]
    ]
  , Grid.row []
    [ Grid.col []
      [ Html.img
        [ Attributes.src <| model.basePath ++ "/assets/brewers_friend_hint.png"
        , Attributes.alt "ID is the number in Brewer's Friend recipe link"
        , Attributes.attribute "width" "100%"
        ] []
      ]
    ]
  ]
