import { useState } from "react";

import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";

import "./App.css";


function App() {

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);


  // ADD TO CART
  function addToCart(product) {

    setCart((currentCart) => {

      const existingItem = currentCart.find(
        (item) =>
          item.product.id === product.id
      );


      if (existingItem) {

        return currentCart.map((item) => {

          if (item.product.id === product.id) {

            return {
              ...item,
              quantity: item.quantity + 1
            };

          }

          return item;

        });

      }


      return [
        ...currentCart,
        {
          product: product,
          quantity: 1
        }
      ];

    });

  }


  // REMOVE ITEM
  function removeFromCart(productId) {

    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.product.id !== productId
      )
    );

  }


  // UPDATE QUANTITY
  function updateQuantity(productId, quantity) {

    if (quantity < 1 || isNaN(quantity)) {
      return;
    }


    setCart((currentCart) =>
      currentCart.map((item) => {

        if (item.product.id === productId) {

          return {
            ...item,
            quantity: quantity
          };

        }

        return item;

      })
    );

  }


  // CLEAR CART
  function clearCart() {

    setCart([]);

  }


  // CART COUNT
  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  return (
    <div>


      {/* HEADER */}

      <header>

        <div className="logo">
          🥛 DairyShop
        </div>


        <nav>

          <a href="#home">
            Home
          </a>

          <a href="#products">
            Products
          </a>


          <button
            className="cart-button"
            onClick={() =>
              setShowCart(!showCart)
            }
          >

            🛒 Cart

            <span className="cart-count">
              {cartCount}
            </span>

          </button>

        </nav>

      </header>


      {/* HERO */}

      <section
        className="hero"
        id="home"
      >

        <div>

          <h1>
            Fresh Dairy Products
          </h1>

          <p>
            Pure, Fresh and Delivered
            to Your Doorstep
          </p>

          <a
            href="#products"
            className="shop-button"
          >
            Shop Now
          </a>

        </div>

      </section>


      {/* PRODUCTS */}

      <main
        className="container"
        id="products"
      >

        <ProductList
          addToCart={addToCart}
        />

      </main>


      {/* CART */}

      {showCart && (

        <section className="container">

          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />

        </section>

      )}


      {/* CHECKOUT */}

      <section className="container">

        <CheckoutForm
          cart={cart}
          clearCart={clearCart}
        />

      </section>


      {/* FOOTER */}

      <footer>

        <p>
          Contact: support@dairyshop.com
          {" | "}
          Phone: 9876543210
        </p>

        <p>
          © 2026 DairyShop.
          All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;