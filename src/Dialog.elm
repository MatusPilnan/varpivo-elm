module Dialog exposing (..)

import Html
import Material.Button as Button
import Material.Dialog as Dialog
import Material.Typography as Typography

dialog value open onClose =
  Dialog.dialog
     (Dialog.config
         |> Dialog.setOpen open
         |> Dialog.setOnClose onClose
     )
     { title = Nothing
     , content = [ Html.p [ Typography.headline6 ] [ Html.text ( String.fromFloat value )] ]
     , actions =
         [ Button.text
             (Button.config |> Button.setOnClick onClose)
             "Cancel"
         , Button.text
             (Button.config |> Button.setOnClick onClose)
             "Discard"
         ]
     }
