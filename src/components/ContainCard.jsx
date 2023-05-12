import React, { useState, useEffect } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import CardProduct from "./CardProduct";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

// FIREBASE
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ContainCard() {
  const [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);

  const { nameCategory } = useParams();

  useEffect(() => {
    const items = collection(db, "Zapatos");
    if (nameCategory) {
      const collectionFiltrada = query(
        items,
        where("categoria", "==", nameCategory)
      );

      /* 
        getDocs para todos los documento
        getDoc para un solo documento
        addDoc para agregar un documento
        setDoc
        updateDoc para modificar un documento
        deleteDoc para eliminar un documento
      */

      getDocs(collectionFiltrada).then((data) => {
        const allitems = data.docs.map((item) => {
          return {
            ...item.data(),
            id: item.id,
          };
        });
        setProducts(allitems);
        setLoading(false);
      });
    } else {
      getDocs(items).then((data) => {
        const allitems = data.docs.map((item) => {
          return {
            ...item.data(),
            id: item.id,
          };
        });
        setProducts(allitems);
        setLoading(false);
      });
    }
  }, [nameCategory]);

  // Si el array esta vacio solo se ejecuta una vez cuando se monta
  // Si el array tiene una dependencia se actualizara cada vez que esa dependencia cambie
  //

  return (
    <Grid
      container
      spacing={5}
      style={{ justifyContent: "space-around", padding: "50px 0" }}
    >
      {products[0] &&
        products.map((product) => (
          <Grid item xs={4} key={product.id}>
            <CardProduct
              id={product.id}
              marca={product.marca}
              modelo={product.modelo}
              precio={product.precio}
              img={product.img}
            />
          </Grid>
        ))}
      <Grid item xs={4}>
        <PacmanLoader
          color="#FF0000"
          loading={loading}
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Grid>
    </Grid>
  );
}
