import axios from "axios";
import { useState } from "react";

const EditForm = ({ product, onUpdateProduct }) => {
  const [data, setData] = useState({
    title: product.title,
    price: product.price,
    quantity: product.quantity
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await axios.put(`/api/products/${product._id}`, data);
    onUpdateProduct(response.data);
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={data.title}
            onChange={e => setData({ ...data, title: e.target.value })}
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={data.price}
            onChange={e => setData({ ...data, price: e.target.value })}
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={data.quantity}
            onChange={e => setData({ ...data, quantity: e.target.value })}
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => onUpdateProduct(product)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
