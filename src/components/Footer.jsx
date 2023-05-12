import * as React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "black",
        color: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "150px",
      }}
    >
      <Typography variant="body1">CONOCENOS</Typography>
      <Typography variant="body1">CONTACTANOS</Typography>
      <Typography variant="body1">SALUDANOS</Typography>
    </Box>
  );
}
