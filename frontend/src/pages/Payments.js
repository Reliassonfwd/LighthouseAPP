import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../styles/Payments.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { paymentDetailsSchema } from "../components/paymentSchema";
import PaymentForm from "../components/PaymentForm";

const Payments = () => {
  const location = useLocation();

  const { Id } = useParams();

  const llamadoTours = async () => {
    const url = `http://localhost:3001/api/v1/tours/${Id}`;
    const response = await fetch(url);
    const data = await response.json();
    setTourInfo(data);
  };
  useEffect(() => {
    llamadoTours();
  }, [Id]);

  const [modalVisible, setModalVisible] = useState(false);
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
  const [tourInfo, setTourInfo] = useState([]);

  const selectedTour = location.state && location.state.selectedTour;
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setPaymentDetails({
      ...paymentDetails,
      [event.target.name]: event.target.value,
    });
  };

  const [paymentId, setPaymentId] = useState(1);

  const handlePayment = async (event) => {
    event.preventDefault();

    try {
      await paymentDetailsSchema.validate(paymentDetails);
    } catch (error) {
      alert(error.message);
      return;
    }

    generateInvoicePDF();
    setModalVisible(true);

    setPaymentId(paymentId + 1);

    const url = `http://localhost:3001/api/v1/payments`;
    const paymentData = {
      payment_type: "Credit Card",
      card_name: paymentDetails.cardHolderName,
      card_number: paymentDetails.cardNumber,
      cvv: paymentDetails.cvv,
      expiration_date: paymentDetails.expiryDate,
      user_id: localStorage.getItem("userId"),
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(paymentData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data.error;
      }
      console.log(data);

      const bookingUrl = `http://localhost:3001/api/v1/bookings`;
      const bookingData = {
        user_id: localStorage.getItem("userId"),
        tour_id: Id, // Asegúrate de que este es el id correcto del tour
        payment_id: data.id, // Aquí es donde usas el id del pago que acabas de hacer
        booking_date: paymentDetails.bookingDate, // Asegúrate de que este es el nombre correcto del campo de la fecha de reserva
      };
      const bookingResponse = await fetch(bookingUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(bookingData),
      });
      const bookingDataResponse = await bookingResponse.json();
      if (!bookingResponse.ok) {
        throw bookingDataResponse.error;
      }
      console.log(bookingDataResponse);
    } catch (error) {
      console.log("error", error);
    }
  };

  const closeModal = () => {
    console.log("Closing modal...");
    setModalVisible(false);

    // Redirige a la página de tours u otra página después del pago exitoso
    navigate("/reservation");
  };

  const generateInvoicePDF = () => {
    console.log("Generating invoice PDF...");
    const doc = new jsPDF();

    // Encabezado de la factura
    doc.setFontSize(18);
    doc.text("Reserve With Köla", 14, 22);
    doc.setFontSize(11);
    doc.text(`Nombre: ${paymentDetails.fullName}`, 14, 30);
    doc.text(`Cantidad de personas: ${paymentDetails.numberOfPeople}`, 14, 40);
    // doc.text(`ID de pago: ${paymentId}`, 14, 50);

    // Información del tour
    if (tourInfo) {
      doc.text(`Tour: ${tourInfo.name}`, 14, 50);
      doc.text(`Precio por persona: $${tourInfo.price}`, 14, 60);

      // Agregar detalles de la tabla con los datos del tour
      const tourTableData = [
        [
          tourInfo.name,
          tourInfo.price,
          paymentDetails.numberOfPeople,
          tourInfo.price * paymentDetails.numberOfPeople,
        ],
      ];

      autoTable(doc, {
        startY: 70,
        head: [
          [
            "Tour",
            "Precio por persona",
            "Cantidad de personas",
            "Precio total $",
          ],
        ],
        body: tourTableData,
      });
    }

    doc.save("factura.pdf");
  };

  return (
    <div>
      {/* Mostrar información del tour en el formulario */}
      {tourInfo && (
        <div className="Tourinfo">
          <h1>Tour Information</h1>
          <p className="pinfo">Tour name: {tourInfo.name}</p>
          <p className="pinfo">Price per person: ${tourInfo.price}</p>
          <br />
          {/* Agrega más detalles según sea necesario */}
        </div>
      )}
      <h1>PAYMENT</h1>
      <PaymentForm
        handleInputChange={handleInputChange}
        handlePayment={handlePayment}
        paymentDetails={paymentDetails}
      />

      <div>
        <br />
        <br />
      </div>

      {modalVisible && (
        <Modal onClose={closeModal} paymentSuccess={true}>
          <h2>Payment Successful!</h2>
          <p>
            Your payment for {selectedTour ? selectedTour.name : "the tour"} has
            been processed successfully.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Payments;
