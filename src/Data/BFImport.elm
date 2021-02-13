module Data.BFImport exposing (..)


type alias BFImport =
  { form :
    { value : String
    , valid : Bool
    , error : String
    , hint : String
    }
  , replace : Bool
  , add : Bool
  , successMessage : String
  , errorMessage : String
  , importing : Bool
  }



defaultBFImport : BFImport
defaultBFImport =
  { form =
    { valid = True
    , value = ""
    , error = ""
    , hint = "Enter the ID or URL of your recipe from Brewer's Friend"
    }
  , replace = False
  , add = False
  , successMessage = ""
  , errorMessage = ""
  , importing = False
  }
