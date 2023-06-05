import React, { useEffect } from "react";
import Product from "./Product";
import axios from "axios";

const ProductListing = ({ products, setProducts, cartItems, setCartItems }) => {
  const handleDelete = async productId => {
    const response = await axios.delete(`/api/products/${productId}`);
    setProducts(products.filter(p => p._id !== productId));
    return response.data;
  };

  const handleAddItemToCart = async itemId => {
    const response = await axios.post("/api/add-to-cart", { productId: itemId });
    const { product, item } = response.data;

    const updatedProducts = products.map(p => (p._id === product._id ? product : p));
    setProducts(updatedProducts);

    const existingItemIndex = cartItems.findIndex(cartItem => cartItem._id === item._id);

    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = item;
      setCartItems(updatedCartItems);
    } else {
      setCartItems(prevCartItems => [...prevCartItems, item]);
    }
  };

  const handleUpdateProduct = (productId, updatedProduct) => {
    updatedProduct.price = parseFloat(updatedProduct.price).toFixed(2);
    setProducts(prevProducts =>
      prevProducts.map(product => (product._id === productId ? updatedProduct : product))
    );
  };

  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((item, idx) => (
          <Product
            product={item}
            key={idx}
            onAdd={handleAddItemToCart}
            onUpdateProduct={handleUpdateProduct}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
