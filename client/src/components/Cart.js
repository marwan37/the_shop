import CartItem from "./CartItem";

const Cart = ({ cartItems, onCheckout }) => {
  const sumCartItems = () => {
    if (cartItems.length > 1) {
      return cartItems.map(item => parseFloat(item.price)).reduce((acc, item) => acc + item);
    }
    return 0;
  };

  return (
    <div className="cart">
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 && cartItems.map((item, idx) => (
              <tr key={idx}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total">
              Total: ${parseFloat(sumCartItems()).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button className="checkout" disabled={cartItems.length == 0} onClick={onCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};
export default Cart;
