module Dialog exposing (..)

import Bootstrap.Utilities.Size as Size
import Html
import Material.Button as Button
import Material.Dialog as Dialog
import Material.HelperText as HelperText
import Material.TextField as TextField
import Material.Typography as Typography
import Maybe exposing (withDefault)
import Messages exposing (Msg(..))


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

