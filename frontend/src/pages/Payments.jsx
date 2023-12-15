import React, { useEffect, useState, useCallback } from "react";
import Modal from "../components/Modal";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../styles/Payments.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { paymentDetailsSchema } from "../components/paymentSchema";
import PaymentForm from "../components/PaymentForm";

// Payments Component
//
// A React component for handling payments. Allows users to input payment details
// and generates an invoice PDF upon successful payment.
const Payments = () => {
  // Retrieve location and tour ID from the route parameters
  const location = useLocation();
  const { Id } = useParams();

  // Function to fetch tour information based on the ID
  const llamadoTours = useCallback(async () => {
    const url = `http://localhost:3001/api/v1/tours/${Id}`;
    const response = await fetch(url);
    const data = await response.json();
    setTourInfo(data);
  }, [Id]);

  useEffect(() => {
    llamadoTours();
  }, [llamadoTours]);

  // State for modal visibility, payment details, and tour information
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

  // Retrieve selected tour information from the location state
  const selectedTour = location.state && location.state.selectedTour;

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle input changes in the payment form
  const handleInputChange = (event) => {
    setPaymentDetails({
      ...paymentDetails,
      [event.target.name]: event.target.value,
    });
  };

  // State for tracking payment ID
  const [paymentId, setPaymentId] = useState(1);

  // Function to handle payment submission
  const handlePayment = async (event) => {
    event.preventDefault();

    // Validate payment details using the paymentDetailsSchema schema
    try {
      await paymentDetailsSchema.validate(paymentDetails);
    } catch (error) {
      alert(error.message);
      return;
    }

    // Generate invoice PDF and show modal
    generateInvoicePDF();
    setModalVisible(true);

    // Increment payment ID
    setPaymentId(paymentId + 1);

    // Post payment details to the server
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

      // Post booking details to the server
      const bookingUrl = `http://localhost:3001/api/v1/bookings`;
      const bookingData = {
        user_id: localStorage.getItem("userId"),
        tour_id: Id,
        payment_id: data.id,
        booking_date: paymentDetails.bookingDate,
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
    } catch (error) {
      console.log("error", error);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    console.log("Closing modal...");
    setModalVisible(false);

    // Redirect to the reservation page or another page after successful payment
    navigate("/reservation");
  };

  // Function to generate an invoice PDF
  const generateInvoicePDF = () => {
    console.log("Generating invoice PDF...");
    const doc = new jsPDF();

    // Invoice header
    doc.setFontSize(18);
    doc.text("Reserve With Lighthouse", 14, 22);
    doc.setFontSize(11);
    doc.text(`Name: ${paymentDetails.fullName}`, 14, 30);
    doc.text(`Number of People: ${paymentDetails.numberOfPeople}`, 14, 40);

    // Tour information
    if (tourInfo) {
      doc.text(`Tour: ${tourInfo.name}`, 14, 50);
      doc.text(`Price per Person: $${tourInfo.price}`, 14, 60);

      // Add table details with tour data
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
          ["Tour", "Price per Person", "Number of People", "Total Price $"],
        ],
        body: tourTableData,
      });
    }

    doc.save("invoice.pdf");
  };

  return (
    <div>
      {/* Display tour information in the form */}
      {tourInfo && (
        <div className="Tourinfo">
          <h1>Tour Information</h1>
          <p className="pinfo">Tour Name: {tourInfo.name}</p>
          <p className="pinfo">Price per Person: ${tourInfo.price}</p>
          <br />
          {/* Add more details as needed */}
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

      {/* Display modal upon successful payment */}
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

// Export:
// - Exports the Payments component for usage in the application.
export default Payments;
