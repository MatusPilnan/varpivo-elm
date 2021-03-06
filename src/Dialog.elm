module Dialog exposing (..)

import Bootstrap.Alert as Alert
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Utilities.Size as Size
import Bootstrap.Utilities.Spacing as Spacing
import ConnectionsManagement exposing (brewSessionLink)
import Html
import Html.Attributes as Attributes
import Material.Button as Button
import Material.Dialog as Dialog
import Material.HelperText as HelperText
import Material.Switch as Switch
import Material.TextField as TextField
import Material.Typography as Typography
import Maybe exposing (withDefault)
import Messages exposing (DialogVariant(..), Msg(..))
import Model exposing (BrewSessionSecurity, Model)


dialog content title actions =
  Dialog.dialog
     (Dialog.config
         |> Dialog.setOpen True
         |> Dialog.setOnClose ( CloseDialog Nothing )
     )
     { title = title
     , content = content
     , actions = case actions of
                   Just ac ->
                     ac
                   Nothing -> [ Button.text
                                    (Button.config |> Button.setOnClick (CloseDialog Nothing))
                                    "Cancel" ]

     }


dialogActions onConfirm onClose =
  [ Button.text
    (Button.config |> Button.setOnClick ( CloseDialog onConfirm ))
    "OK"
  , Button.text
    (Button.config |> Button.setOnClick ( CloseDialog onClose ))
    "Cancel"
  ]

scaleDialogContent value =
  [ Html.p [ Typography.headline6 ] [ Html.text ( (String.fromFloat value) ++ " g" )] ]

confirmDialogContent message =
  [ Html.text message ]

calibrationDialogContent =
  [ Html.p [] [Html.text "Enter real weight (grams) for calibration"]
  , TextField.filled
    ( TextField.config
      |> TextField.setLabel (Just "Real weight")
      |> TextField.setRequired True
      |> TextField.setSuffix (Just " g")
      |> TextField.setEndAligned True
      |> TextField.setType (Just "number")
      |> TextField.setMin (Just 1)
      |> TextField.setMax (Just 5000)
      |> TextField.setStep (Just 100)
      |> TextField.setOnChange (\value -> CalibrationValueUpdate (withDefault -1 (String.toInt value)) )
      |> TextField.setAttributes [ Size.w100 ]
    )
  , HelperText.helperLine [] [ HelperText.helperText (HelperText.config |> HelperText.setPersistent True) "Weight of object used for calibration"]
  ]


securityDialogContent : BrewSessionSecurity -> List (Html.Html Msg)
securityDialogContent security =
 [ if security.valid
   then Alert.simpleSuccess [ Typography.body1 ] [ Html.text "Your brew session key seems valid. There is no need to change it right now." ]
   else Html.div [] []
 , Html.p [ Typography.body1 ] [ Html.text "Enter current brew session key code here to be able to control the brewing process." ]
 , TextField.filled
   ( TextField.config
     |> TextField.setLabel (Just "Brew session key code")
     |> TextField.setRequired True
     |> TextField.setValue (Just security.form.value)
     |> TextField.setOnInput BrewSessionCodeInput
     |> TextField.setValid security.form.valid
     |> TextField.setOnChange BrewSessionCodeChange
     |> TextField.setAttributes [ Size.w100 ]
   )
 , HelperText.helperLine []
   [ HelperText.helperText
     ( HelperText.config
     |> HelperText.setPersistent True
     |> HelperText.setValidation (not security.form.valid)
     ) (if security.form.valid then security.form.hint else security.form.error)]
 , Html.p [ Typography.body2, Spacing.mt3 ] [ Html.text "You can find the current brew session key code on the device screen. Or use the NFC thing!" ]
 ]


inviteDialogActions sharingSupported =
  [ Button.text
    (Button.config |> Button.setOnClick ( CloseDialog (Just ShareLink) ))
    (if sharingSupported then "Share" else "Copy")
  , Button.text
    (Button.config |> Button.setOnClick ( CloseDialog Nothing ))
    "Cancel"
  ]


inviteDialogContent model =
  [ Html.p [ Typography.body1 ] [ Html.text "Share this link with a friend to invite them to the brew session." ]
  , Alert.simpleDark [ Spacing.p1, Spacing.px2 ]
    [ Html.p
      [ Attributes.style "overflow" "scroll"
      , Attributes.style "white-space" "nowrap"
      , Spacing.m0, Spacing.py1
      ] [ Html.text <| brewSessionLink model ] ]
  ] ++ ( if model.security.valid
  then
  [ Grid.row []
    [ Grid.col []
      [ Html.p [ Typography.body1, Spacing.m0 ] [ Html.text "Share with brew session code" ]
      ]
    , Grid.col [ Col.xsAuto, Col.attrs [ Attributes.align "center" ], Col.middleXs  ]
      [ Switch.switch
        ( Switch.config
          |> Switch.setChecked model.security.shareSecurityCode
          |> Switch.setOnChange ToggleCodeSharing
        )
      ]
    ]
  , if model.security.shareSecurityCode
    then Alert.simpleWarning [ Typography.body2, Spacing.p2, Spacing.mt3 ] [ Html.text "Careful! Sharing your brew session code will allow the user to control your brew session." ]
    else Html.div [] []
  ]
  else []
  )



showDialog : Model -> Html.Html Msg
showDialog model =
  case model.dialogVariant of
    Nothing ->
      Html.div [] []

    Just Security ->
      dialog (securityDialogContent model.security) (Just "Brew session key") (Just (dialogActions (Just (BrewSessionCodeChange model.security.form.value)) (Just ( CloseDialog Nothing ))) )

    Just Messages.Scale ->
      dialog (scaleDialogContent model.weight) (Just "Scale") Nothing

    Just (Confirm (prompt, action)) ->
      dialog (confirmDialogContent prompt) (Just "Confirm") (Just ( dialogActions ( Just action ) (Just ( CloseDialog Nothing ))))

    Just Calibration ->
      dialog (calibrationDialogContent) (Just "Scale calibration") (Just (dialogActions (Just StartCalibration) ( Just (CloseDialog Nothing)) ))

    Just Invite ->
      dialog (inviteDialogContent model) (Just "Invite a friend") (Just (inviteDialogActions model.sharingSupported))
