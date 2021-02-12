module Menu exposing (menuDrawer)


import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Utilities.Spacing as Spacing
import Html exposing (Html, text)
import Html.Attributes as Attributes
import Material.Drawer.Modal as ModalDrawer
import Material.Icon as Icon
import Material.IconButton as IconButton
import Material.List as List
import Material.List.Divider as ListDivider
import Material.List.Item as ListItem
import Messages exposing (DialogVariant(..), Msg(..))
import Model exposing (Model)


menuDrawer : Model -> Bool -> List (Html.Html Msg)
menuDrawer model activeBrewSession =
  [ ModalDrawer.drawer (ModalDrawer.config
    |> ModalDrawer.setOpen model.menuOpened
    |> ModalDrawer.setOnClose MenuClosed
    )
    [ ModalDrawer.header []
      [ Grid.row []
        [ Grid.col [ Col.attrs [ Spacing.pr0 ] ]
          [ Html.h3 [ ModalDrawer.title ] [ text "Var:Pivo" ]
          , Html.h6 [ ModalDrawer.subtitle ] [ subtitle model ]
          ]
        , Grid.col [ Col.xsAuto, Col.attrs [ Spacing.p0, Attributes.align "center" ], Col.middleXs ]
          [ IconButton.iconButton
            (IconButton.config |> IconButton.setOnClick MenuClosed)
            (IconButton.icon "close")
          ]
        ]
      ]

    , ModalDrawer.content []
      [ List.group [] <|
        (brewSessionGroup activeBrewSession)
        ++ scaleGroup
        ++ (settingsGroup model.security.valid)
      ]
    ]
  , ModalDrawer.scrim [] []
  ]

scaleGroup : List (Html Msg)
scaleGroup =
  [ ListDivider.group []
  , List.subheader [] [ text "Scale" ]
  , List.list
      ( List.config |> List.setWrapFocus True )
      ( ListItem.listItem (ListItem.config |> ListItem.setOnClick (ShowDialog Scale))
        [ text "Mini scale"
        , ListItem.meta [] [ Html.i [ Attributes.class "fas", Attributes.class "fa-balance-scale-right" ] [] ]
        ] )
      [ ListItem.listItem (ListItem.config |> ListItem.setOnClick (ShowDialog Calibration))
        [ text "Calibrate scale"
        , ListItem.meta [] [ Html.i [ Attributes.class "fas", Attributes.class "fa-balance-scale" ] [] ]
        ]
      , ListItem.listItem (ListItem.config |> ListItem.setOnClick (NavigateTo (["scale"], [])))
        [ text "Scale"
        , ListItem.meta [] [ Html.i [ Attributes.class "fas", Attributes.class "fa-balance-scale-left" ] [] ]
        ]
      ]
  ]

brewSessionGroup : Bool -> List (Html Msg)
brewSessionGroup activeBrewSession =
  [ ListDivider.group []
  , List.subheader [] [ text "Brew Session" ]
  , List.list
      ( List.config |> List.setWrapFocus True )
      ( ListItem.listItem
        ( ListItem.config
          --|> ListItem.setOnClick
        )
        [ text "Invite friends"
        , ListItem.meta [] [ Icon.icon [] "person_add" ]
        ]
      )
      (if activeBrewSession
        then [ ListItem.listItem (ListItem.config |> ListItem.setOnClick
           ( ShowDialog (Confirm ("Do you really want to discard current brew session? This can't be undone!", CancelBrewSession))
           ))
           [ text "Cancel brewing"
           , ListItem.meta [] [ Icon.icon [] "delete" ]
           ]
         ]
        else [])
  ]

settingsGroup : Bool -> List (Html Msg)
settingsGroup brewSessionCodeValid =
  [ ListDivider.group []
  , List.subheader [] [ text "Settings" ]
  , List.list
      ( List.config |> List.setWrapFocus True )
      ( ListItem.listItem
        ( ListItem.config
          |> ListItem.setOnClick (NavigateTo (["connections"], []))
        )
        [ text "Manage connections"
        , ListItem.meta [] [ Icon.icon [] "wifi" ]
        ]
      )
      [ ListItem.listItem
        ( ListItem.config
          |> ListItem.setOnClick (ShowDialog Security)
        )
        [ text "Edit brew session key"
        , ListItem.meta [] [ Icon.icon [] (if brewSessionCodeValid then "verified_user" else "vpn_key") ]
        ]
      ]
  ]


subtitle : Model -> Html msg
subtitle model =
  Html.text (
  case model.selectedRecipe of
    Just recipe ->
      "Brewing " ++ recipe.name
    Nothing ->
      case model.selectedApiUrl of
        Just url ->
          "Connected to " ++ url

        Nothing ->
          "Not connected"
  )
