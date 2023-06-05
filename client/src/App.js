import { useState, useEffect } from "react";
import productData from "./mockData/data";
import Header from "./components/Header";
import axios from "axios";

import ProductListing from "./components/ProductListing";
import AddForm from "./components/AddForm";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const addAllMockData = async () => {
    productData.forEach(async product => {
      productExists = products.filter(p => p._id === product._id);
      if (!productExists) {
        await axios.post("/api/products", product);
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products");
      const data = response.data;
      setProducts(data);
    };
    fetchProducts();

    const fetchCartItems = async () => {
      const response = await axios.get("/api/cart");
      const data = response.data;
      setCartItems(data);
    };
    fetchCartItems();
  }, []);

  const handleSubmitNewProduct = async formData => {
    try {
      const response = await axios.post("/api/products", formData);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckout = async () => {
    const checkoutPromises = cartItems.map(item => {
      const product = products.find(p => p._id == (item.productId || item._id));
      const updatedProduct = { ...product };
      return axios.put(`/api/products/${item._id}`, updatedProduct);
    });

    await Promise.all(checkoutPromises);
    await axios.post("/api/checkout");

    const productsResponse = await axios.get("/api/products");
    setProducts(productsResponse.data);

    const cartResponse = await axios.get("/api/cart");
    setCartItems(cartResponse.data);
  };

  return (
    <div id="app">
      <Header cartItems={cartItems} onCheckout={handleCheckout} />
      <main>
        <ProductListing
          products={products}
          setProducts={setProducts}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
        <AddForm onSubmitNewProduct={handleSubmitNewProduct} />
      </main>
    </div>
  );
};

export default App;
