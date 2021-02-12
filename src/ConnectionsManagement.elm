module ConnectionsManagement exposing (..)

import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Utilities.Flex as Flex
import Bootstrap.Utilities.Size as Size
import Bootstrap.Utilities.Spacing as Spacing
import Html exposing (Html, text)
import Html.Attributes as Attributes
import Json.Encode exposing (list, string)
import Material.Button as Button
import Material.CircularProgress as CircularProgress
import Material.HelperText as HelperText
import Material.Select as Select
import Material.Select.Item as SelectItem
import Material.TextField as TextField
import Material.TextField.Icon as TextFieldIcon
import Material.Typography as Typography
import Maybe exposing (withDefault)
import Messages exposing (Msg(..))
import Model exposing (Model)


noApiUrl : Model -> Html Msg
noApiUrl model =
  let
    apiUrlToSelectItem apiUrl =
      SelectItem.selectItem
        (SelectItem.config { value = apiUrl})
        [ text apiUrl ]
  in
  Html.div [ Flex.block, Flex.col, Flex.alignItemsCenter, Flex.justifyAround ]
  [ Grid.container []
    [ Grid.row []
      [ Grid.col []
        [ Html.h4 [ Typography.headline4, Spacing.p2 ] [ text "Where should we connect to?" ]
        ]
      ]
    , Html.div [] (
      case model.storedApiUrls of
        [] ->
          []
        first::rest ->
          [ Grid.row []
            [ Grid.col []
              [ Html.p [ Typography.body1 ] [ text "Select one of your stored connections below." ]
              ]
            ]
          , Grid.row []
            [ Grid.col []
              [ Select.outlined
                ( Select.config
                  |> Select.setLabel (Just "Var:Pivo server address")
                  |> Select.setOnChange SelectApiUrl
                  |> Select.setAttributes [ Attributes.class "varpivo-connection-select" ]
                  |> Select.setSelected model.selectedApiUrl
                  |> Select.setValid (newApiUrlValidity model)
                )
                ( apiUrlToSelectItem first
                )
                (List.map apiUrlToSelectItem rest)
              , helperText model
              ]
            ]
          , Grid.row []
            [ Grid.col []
              [ Button.outlined
                ( Button.config
                  |> Button.setOnClick Increment
                  |> Button.setAttributes [ Size.w100 ]
                  |> Button.setDisabled ((withDefault "" model.selectedApiUrl) == model.apiBaseUrl || urlNotSelected model)
                  |> Button.setOnClick (RemoveApiUrl ( withDefault "" model.selectedApiUrl))
                )
                "Remove"
              ]
            , Grid.col [ Col.attrs [ Attributes.align "end" ] ]
              [ Button.raised
                ( Button.config
                  |> Button.setOnClick (NewApiUrl (withDefault model.apiBaseUrl model.selectedApiUrl))
                  |> Button.setAttributes [ Size.w100 ]
                  |> Button.setDisabled (urlNotSelected model)
                ) "Connect" ]
            ]
          , Grid.row [ Row.attrs [ Spacing.mt5 ] ]
            [ Grid.col []
              [ Html.p [ Typography.headline6 ] [ text "Or..." ]
              ]
            ]
          ]
      )
    , Grid.row []
      [ Grid.col []
        [ Html.p [ Typography.body1 ] [ text "Enter the address of your Var:Pivo server." ]
        ]
      ]
    , Grid.row []
      [ Grid.col []
        [ Html.p [ Typography.body1 ] [ text "You should find it on the device display, or try the NFC thing!" ]
        ]
      ]
    , Grid.row []
      [ Grid.col []
        [ TextField.outlined
          ( TextField.config
            |> TextField.setLabel (Just "Address of Var:Pivo server")
            |> TextField.setRequired True
            |> TextField.setType (Just "string")
            |> TextField.setAttributes [ Size.w100 ]
            |> TextField.setOnChange (NewApiUrl)
            |> TextField.setTrailingIcon
              ( if model.apiConnecting
                then Just (TextFieldIcon.customIcon Html.div [] [CircularProgress.indeterminate (CircularProgress.config |> CircularProgress.setSize CircularProgress.small)])
                else Nothing
              )
            |> TextField.setValid (newApiUrlValidity model)
          )
        , helperText model
        ]
      ]
    ]
  ]


newApiUrlValidity : Model -> Bool
newApiUrlValidity model =
  case model.newApiUrlFormError of
    Nothing ->
      True
    Just _ ->
      False

helperText model =
  HelperText.helperLine []
    [ HelperText.helperText
      ( HelperText.config
        |> HelperText.setPersistent True
        |> HelperText.setValidation (not (newApiUrlValidity model))
      )
      ( withDefault (if model.apiConnecting then "Connecting..." else "What address is the server on?") model.newApiUrlFormError )
    ]

urlNotSelected model =
  case model.selectedApiUrl of
    Just _ ->
      False
    Nothing ->
      True

brewSessionLink : Model -> String
brewSessionLink model =
  let
      base =
          model.origin ++ model.basePath
  in

    case model.apiBaseUrl of
      "" ->
        base

      url ->
        base ++ "?connections=" ++ Json.Encode.encode 0 ( list string [ url ] ) ++ (
        if model.security.valid && model.security.shareSecurityCode
        then "&brewSessionCode=" ++ model.security.code
        else ""
        )

