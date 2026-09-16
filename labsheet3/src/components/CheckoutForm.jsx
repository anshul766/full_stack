import { useState } from "react";

function CheckoutForm({ cart, clearCart }) {

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    payment: "cash"
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState("");


  function handleChange(e) {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  }


  function handleSubmit(e) {

    e.preventDefault();

    const newErrors = {};


    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }


    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }


    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }


    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode =
        "Pincode must be exactly 6 digits";
    }


    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone must be exactly 10 digits";
    }


    if (cart.length === 0) {
      newErrors.cart =
        "Please add products to cart first";
    }


    setErrors(newErrors);


    if (Object.keys(newErrors).length > 0) {
      setMessage("");
      return;
    }


    setMessage(
      "🎉 Order placed successfully!"
    );


    clearCart();


    setFormData({
      name: "",
      address: "",
      city: "",
      pincode: "",
      phone: "",
      payment: "cash"
    });

  }


  return (
    <div className="checkout">

      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>

        <label>Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />

        {errors.name && (
          <span className="error">
            {errors.name}
          </span>
        )}


        <label>Address</label>

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />

        {errors.address && (
          <span className="error">
            {errors.address}
          </span>
        )}


        <label>City</label>

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter your city"
        />

        {errors.city && (
          <span className="error">
            {errors.city}
          </span>
        )}


        <label>Pincode</label>

        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          maxLength="6"
          placeholder="Enter 6 digit pincode"
        />

        {errors.pincode && (
          <span className="error">
            {errors.pincode}
          </span>
        )}


        <label>Phone</label>

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          maxLength="10"
          placeholder="Enter 10 digit phone"
        />

        {errors.phone && (
          <span className="error">
            {errors.phone}
          </span>
        )}


        <label>Payment Method</label>

        <div className="payment">

          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={
                formData.payment === "cash"
              }
              onChange={handleChange}
            />

            Cash on Delivery
          </label>


          <label>
            <input
              type="radio"
              name="payment"
              value="online"
              checked={
                formData.payment === "online"
              }
              onChange={handleChange}
            />

            Online Payment
          </label>

        </div>


        {errors.cart && (
          <span className="error">
            {errors.cart}
          </span>
        )}


        <button type="submit">
          Place Order
        </button>

      </form>


      {message && (
        <p className="success">
          {message}
        </p>
      )}

    </div>
  );
}

export default CheckoutForm;