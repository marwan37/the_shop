import React from "react";
import Cart from "./Cart";

const Header = ({ cartItems, onCheckout }) => {
  return (
    <header>
      <h1>Richard and Marwan</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        {cartItems.length == 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <Cart cartItems={cartItems} onCheckout={onCheckout} />
        )}
      </div>
    </header>
  );
};

export default Header;
