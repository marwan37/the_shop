import { useState } from "react";

const AddForm = ({ onSubmitNewProduct }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleFormSubmit = e => {
    e.preventDefault();
    const formData = { title, price, quantity };
    onSubmitNewProduct(formData);
    setShowAddForm(false);
  };

  return (
    <div className={showAddForm ? "add-form visible" : "add-form"}>
      {!showAddForm && (
        <p>
          <button className="add-product-button" onClick={() => setShowAddForm(true)}>
            Add A Product
          </button>
        </p>
      )}
      {showAddForm && (
        <form onSubmit={handleFormSubmit}>
          <h3>Add Product</h3>
          <div className="input-group">
            <label htmlFor="product-name">Product Name:</label>
            <input
              type="text"
              id="product-name"
              name="product-name"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-price">Price:</label>
            <input
              type="number"
              id="product-price"
              name="product-price"
              value={price}
              min="0"
              step="0.01"
              onChange={e => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-quantity">Quantity:</label>
            <input
              type="number"
              id="product-quantity"
              name="product-quantity"
              min="0"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="actions form-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddForm;
