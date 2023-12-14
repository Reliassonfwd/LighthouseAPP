import React from "react";

const PaymentForm = ({ handleInputChange, handlePayment, paymentDetails }) => {
  return (
    <form onSubmit={handlePayment}>
      <label>
        Card Number:
        <br />
        <input
          type="text"
          name="cardNumber"
          placeholder="xxxx-xxxx-xxxx-xxxx"
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Expiry Date:
        <br />
        <input type="date" name="expiryDate" onChange={handleInputChange} />
      </label>
      <br />
      <label>
        CVV:
        <br />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Card Holder Name:
        <br />
        <input
          type="text"
          name="cardHolderName"
          placeholder="Card Holder Name"
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Full Name:
        <br />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Contact Number:
        <br />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        E-mail:
        <br />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Number Of People:
        <br />
        <input
          type="number"
          name="numberOfPeople"
          min="1"
          max="100"
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Booking Date:
        <br />
        <input type="date" name="bookingDate" onChange={handleInputChange} />
      </label>
      <br />
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
