module ApiErrorMessage exposing (..)

import Material.Snackbar as Snackbar


apiErrorMessage message =
  Snackbar.message message
    |> Snackbar.setActionIcon ( Just (Snackbar.icon "close" ) )
