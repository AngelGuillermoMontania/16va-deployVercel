import React, { useState } from "react";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

export default function CountCart({ onAdd, id, stock }) {
  const [count, setCount] = useState(1);

  function sumar() {
    if (stock >= count + 1) {
      setCount(count + 1);
    }
  }

  function restar() {
    if (count > 1) {
      setCount(count - 1);
    }
  }

  return (
    <div>
      <h2>Cantidad: {count}</h2>
      <div>
        <button onClick={sumar}>+</button>
        <button onClick={restar}>-</button>
      </div>
      <div>
        <button onClick={() => onAdd(count)}>Agregar al carrito</button>
      </div>
    </div>
  );
}
