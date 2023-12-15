import React from "react";

const PaymentForm = ({ handleInputChange, handlePayment, paymentDetails }) => {
  // Render:
  return (
    <form onSubmit={handlePayment}>
      {/* Card Number */}
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

      {/* Expiry Date */}
      <label>
        Expiry Date:
        <br />
        <input type="date" name="expiryDate" onChange={handleInputChange} />
      </label>
      <br />

      {/* CVV */}
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

      {/* Card Holder Name */}
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

      {/* Full Name */}
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

      {/* Contact Number */}
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

      {/* E-mail */}
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

      {/* Number Of People */}
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

      {/* Booking Date */}
      <label>
        Booking Date:
        <br />
        <input type="date" name="bookingDate" onChange={handleInputChange} />
      </label>
      <br />

      {/* Pay button */}
      <button type="submit">Pay</button>
    </form>
  );
};

// Export:
// - Exports the PaymentForm component as the default export.
export default PaymentForm;
