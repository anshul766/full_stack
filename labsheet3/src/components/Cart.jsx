function Cart({ cart, removeFromCart, updateQuantity }) {

  const grandTotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart">

        <h2>Shopping Cart</h2>

        <p className="empty-cart">
          Your cart is empty 🛒
        </p>

      </div>
    );
  }

  return (
    <div className="cart">

      <h2>Shopping Cart</h2>

      {cart.map((item) => {

        const subtotal =
          item.product.price * item.quantity;

        return (
          <div
            className="cart-item"
            key={item.product.id}
          >

            <img
              src={item.product.image}
              alt={item.product.name}
            />

            <div className="cart-details">

              <h3>{item.product.name}</h3>

              <p>
                Price: ₹{item.product.price}
              </p>

              <div className="quantity-box">

                <label>
                  Quantity:
                </label>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.product.id,
                      Number(e.target.value)
                    )
                  }
                />

              </div>

              <p>
                Subtotal: ₹{subtotal}
              </p>

            </div>

            <button
              className="remove-btn"
              onClick={() =>
                removeFromCart(item.product.id)
              }
            >
              Remove
            </button>

          </div>
        );
      })}

      <h2 className="grand-total">
        Grand Total: ₹{grandTotal}
      </h2>

    </div>
  );
}

export default Cart;