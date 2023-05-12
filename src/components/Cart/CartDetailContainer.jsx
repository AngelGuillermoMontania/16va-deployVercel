import React, { useContext, useEffect } from "react";
import CartDetail from "./CartDetail";
import { CartContext } from "../../context/CartContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import { db } from "../../firebaseConfig";
import { getDoc } from "firebase/firestore";

export default function CartDetailContainer() {
  const { cart, getTotalPrice, clearCart, buy } = useContext(CartContext);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        paddingY={10}
      >
        {cart.map((product) => (
          <CartDetail
            marca={product.marca}
            modelo={product.modelo}
            descripcion={product.descripcion}
            precio={product.precio}
            img={product.img}
            cantidad={product.cantidad}
            id={product.id}
          />
        ))}
      </Grid>
      <Grid container display={"flex"} justifyContent={"center"} marginY={4}>
        <Grid item columns={12}>
          <Typography textAlign="center" variant="h4">
            PRECIO TOTAL ${getTotalPrice()}
          </Typography>
          <Button variant="outlined" onClick={clearCart}>
            Limpiar Carrito
          </Button>
          <Button variant="outlined" onClick={buy}>
            Comprar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
