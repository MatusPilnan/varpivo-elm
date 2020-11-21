module Dialog exposing (..)

import Html
import Material.Button as Button
import Material.Dialog as Dialog
import Material.Typography as Typography
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
  [ Html.p [ Typography.headline6 ] [ Html.text ( String.fromFloat value )] ]

confirmDialogContent message =
  [ Html.text message ]
