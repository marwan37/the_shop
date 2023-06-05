import { useState } from "react";
import EditForm from "./EditForm";

const Product = ({ product, onAdd, onUpdateProduct, onDelete }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <li className="product">
      <div className="product-details">
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
        <p className={product.quantity <= 0 ? "quantity none-left" : "quantity"}>
          {product.quantity} left in stock
        </p>
        <div className="actions product-actions">
          <button
            className="add-to-cart"
            onClick={e => onAdd(product._id)}
            disabled={product.quantity <= 0}>
            Add to Cart
          </button>
          <button className="edit" onClick={() => setShowEditForm(true)}>
            Edit
          </button>
        </div>
        <button className="delete-button" onClick={() => onDelete(product._id)}>
          <span>X</span>
        </button>
        {showEditForm && (
          <EditForm
            product={product}
            onUpdateProduct={updatedProduct => onUpdateProduct(product._id, updatedProduct)}
          />
        )}
      </div>
    </li>
  );
};

export default Product;
