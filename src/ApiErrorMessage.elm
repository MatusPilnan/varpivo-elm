module ApiErrorMessage exposing (..)

import Material.Snackbar as Snackbar


apiErrorMessage : String -> Snackbar.Message msg
apiErrorMessage message =
  Snackbar.message message
    |> Snackbar.setActionIcon ( Just (Snackbar.icon "close" ) )
