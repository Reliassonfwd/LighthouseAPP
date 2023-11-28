import React, { useState } from "react";
import "../styles/Payments.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Payments = () => {
  const [cart, setCart] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
    fullName: "",
    contactNumber: "",
    email: "",
    numberOfPeople: 1,
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

    const doc = new jsPDF();

    // Encabezado de la factura
    doc.setFontSize(18);
    doc.text("Factura", 14, 22);
    doc.setFontSize(11);
    doc.text(`Nombre: ${paymentDetails.fullName}`, 14, 30);
    doc.text(`Cantidad de personas: ${paymentDetails.numberOfPeople}`, 14, 40);

    // Tabla con detalles del tour
    const columns = ["Tour", "Precio por persona", "Cantidad de personas", "Precio total"];
    const rows = cart.map((tour) => [
      tour.name,
      tour.price,
      paymentDetails.numberOfPeople,
      tour.price * paymentDetails.numberOfPeople,
    ]);

    autoTable(doc, {
      startY: 50,
      head: [columns],
      body: rows,
    });

    doc.save("factura.pdf");
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
          <label>
            Full Name:
            <br />
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Contact Number:
            <br />
            <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleInputChange} />
          </label>
          <br />
          <label>
            E-mail:
            <br />
            <input type="email" name="email" placeholder="E-mail" onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Number Of People:
            <br />
            <input type="number" name="numberOfPeople" min="1" onChange={handleInputChange} />
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