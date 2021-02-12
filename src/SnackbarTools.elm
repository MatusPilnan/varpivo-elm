module SnackbarTools exposing (..)

import Material.Snackbar as Snackbar
import Messages exposing (DialogVariant(..), Msg(..))


simpleMessage : String -> Snackbar.Message msg
simpleMessage message =
  Snackbar.message message
    |> Snackbar.setActionIcon ( Just (Snackbar.icon "close" ) )


brewSessionKeyRejectedMessage : String -> Snackbar.Message Msg
brewSessionKeyRejectedMessage message =
  Snackbar.message message
    |> Snackbar.setActionIcon ( Just (Snackbar.icon "close" ) )
    |> Snackbar.setActionButton (Just "Edit key")
    |> Snackbar.setStacked True
    |> Snackbar.setOnActionButtonClick (\_ -> ShowDialog Security)
