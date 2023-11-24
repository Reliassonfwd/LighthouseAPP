import React, { useState } from "react";
import "../styles/Payments.css";

const Payments = () => {
  const [cart, setCart] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
  });

  const addToCart = (tour) => {
    setCart([...cart, tour]);
  };

  const handleInputChange = (event) => {
    setPaymentDetails({
      ...paymentDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar tu lógica para procesar el pago
  };

  return (
    <div>
      <h1>PAYMENT</h1>
      <div>
        <ul>
          {cart.map((tour) => (
            <li key={tour.id}>{tour.name}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <label>
            Card Number:
            <br />
            <input type="text" name="cardNumber" placeholder="xxxx-xxxx-xxxx-xxxx" onChange={handleInputChange} />
          </label>

          <br />
          <label>
            Expiry Date:
            <br />
            <input type="date" name="expiryDate" onChange={handleInputChange} />
          </label>
          <label> <br />
            CVV:
            <br />
            <input type="text" name="cvv" placeholder="CVV" onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Card Holder Name:
            <br />
            <input type="text" name="cardHolderName" placeholder="Card Holder Name" onChange={handleInputChange} />
          </label>
          <br />
          <br />
          <button type="submit">Pay</button>
        </form>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Payments;