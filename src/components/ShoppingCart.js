import React, { useContext } from "react";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import SimpleTable from "./SimpleTable";

export default function ShoppingCart() {
  const { cart, handleCart } = useContext(ShoppingCartContext);

  return cart.length === 0 ? (
    <div
      style={{
        textAlign: "center",
        fontSize: 40,
        color: "white",
        fontWeight: "bold",
        margin: 50
      }}
    >
      There are no items in your cart, yet!
    </div>
  ) : (
    <SimpleTable cart={cart} />
  );
}
