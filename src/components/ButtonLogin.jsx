import React from "react";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export default function ButtonLogin() {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      color="primary"
      variant="contained"
      onClick={() => loginWithRedirect()}
    >
      Login
    </Button>
  );
}
