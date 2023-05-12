import { getDoc, doc, deleteDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { CartContext } from "../context/CartContext";
import {
  Container,
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import CountCart from "./Cart/CountCart";
import Swal from "sweetalert2";

export default function DetailCard() {
  const [oneProduct, setOneProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const docProduct = doc(db, "Zapatos", id);
    getDoc(docProduct).then((data) => {
      setOneProduct({ ...data.data(), id: data.id });
    });
  }, [id]);

  const { addProductCart } = useContext(CartContext);

  const deleteProduct = async () => {
    const productoAEliminar = doc(db, "Zapatos", oneProduct.id);
    await deleteDoc(productoAEliminar);
  };

  //  CRUD  ----------    ABM
  // post   get    put    delete

  const onAdd = (cantidad) => {
    const agregado = addProductCart({
      ...oneProduct,
      cantidad: cantidad,
    });

    let timerInterval;
    Swal.fire({
      title: "Producto agregado al carrito!",
      html: `Agregaste ${cantidad} productos`,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  };

  // Aca se procesa la funcion onAdd cuando la ejecuta el CountCart

  return (
    <div
      style={{
        padding: "25px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Container
        style={{
          padding: "25px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Card sx={{ minWidth: 500, minHeight: 500 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={oneProduct.img}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {oneProduct.marca}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {oneProduct.descripcion}
              </Typography>
              <Typography variant="h4" color="text.secondary">
                $ {oneProduct.precio}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <CountCart
              onAdd={onAdd}
              id={oneProduct.id}
              stock={oneProduct.stock}
            />
          </CardActions>
          <button onClick={deleteProduct}>ELIMINAR PRODUCTO</button>
        </Card>
      </Container>
    </div>
  );
}
