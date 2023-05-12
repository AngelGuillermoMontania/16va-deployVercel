import { useState, createContext } from "react";
import { db } from "../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const recargarCarrito = () => {};

  const addProductCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      const newCart = cart.map((item) => {
        if (
          item.id === product.id &&
          item.stock >= product.cantidad + item.cantidad
        ) {
          return {
            ...item,
            cantidad: item.cantidad + product.cantidad,
          };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, product]);
    }
  };

  const controlStock = (id, count, stock) => {
    const exist = cart.find((item) => item.id === id);
    if (exist) {
      cart.forEach((item) => {
        if (item.id === id) {
          return item.stock < count + item.cantidad;
        }
      });
    } else {
      if (stock <= count) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getTotalProducts = () => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const totalProducts = cart.reduce((acc, product) => {
      return acc + product.cantidad;
    }, 0);
    return totalProducts;
  };

  const getTotalPrice = () => {
    const totalPrice = cart.reduce((acc, product) => {
      return acc + product.cantidad * product.precio;
    }, 0);
    console.log(cart);
    return totalPrice;
  };

  const deleteProductCart = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  /* 
    import { doc, updateDoc } from "firebase/firestore";

    const washingtonRef = doc(db, "cities", "DC");
    doc(db, coleccion, idDelDocumento)
    // Acceder a un documento por su id

    await updateDoc(washingtonRef, {
      capital: true
    });
    // updateDoc(collection, elObjetoConLoQueQuieroModificar)
    // Actualizar ese documento
  */

  const buy = async () => {
    // ESTO ES PARA AGREGAR
    cart.forEach(async (product) => {
      // addDoc(coleccion, el producto que quiero agregar)
      await addDoc(collection(db, "Pedidos"), product);
    });

    // ESTE ES PARA ACTUALIZAR
    cart.forEach(async (product) => {
      const ProductoAEditar = doc(db, "Zapatos", product.id);
      await updateDoc(ProductoAEditar, {
        stock: product.stock - product.cantidad,
      });
    });
  };

  const data = {
    cart,
    addProductCart,
    getTotalProducts,
    getTotalPrice,
    deleteProductCart,
    clearCart,
    controlStock,
    buy,
    recargarCarrito,
    setCart,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
