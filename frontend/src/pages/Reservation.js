import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";
import "../styles/Modal.css";

// Reservation Component
//
// A React component that displays the user's reservation history.
const Reservation = () => {
  // State to manage reservation data and loading status
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Effect to fetch reservation data on component mount
  useEffect(() => {
    fetchCards();
  }, []);

  // Function to fetch user reservations and tour details
  const fetchCards = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/api/v1/bookings")
      .then((response) => {
        const bookings = response.data;
        return Promise.all(
          bookings.map((booking) =>
            axios.get(`http://localhost:3001/api/v1/tours/${booking.tour_id}`)
          )
        ).then((tourResponses) => {
          const cards = bookings.map((booking, index) => ({
            ...booking,
            tour_name: tourResponses[index].data.name,
            tour_description: tourResponses[index].data.description,
          }));
          setCards(cards);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
        setIsLoading(false);
      });
  };

  // Function to delete a reservation
  const deleteCard = async (id) => {
    console.log(id);
    try {
      // Make a DELETE request to delete the reservation
      const response = await fetch(
        `http://localhost:3001/api/v1/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Check if the response is successful
      if (response.status >= 200 && response.status < 300) {
        const responseBody = await response.text();

        // Parse the response data
        if (responseBody.trim().length > 0) {
          const parsedResponse = JSON.parse(responseBody);
          console.log("Respuesta del servidor:", parsedResponse);
        }

        // Fetch reservation data and show success modal
        fetchCards();
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
      } else {
        throw new Error(`Error deleting card: ${response.status}`);
      }
    } catch (error) {
      console.error("Hubo un error al eliminar la tarjeta:", error);
    }
  };

  // Render loading spinner while fetching data
  if (isLoading) {
    return (
      <body>
        <center>
          <div className="spinner"></div>
        </center>
      </body>
    );
  }

  // Render reservation cards with tour information
  return (
    <>
      {/* Modal for success notification */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-button" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <p>Notification deleted</p>
          </div>
        </div>
      )}
      <h1>MY RESERVES</h1>
      <h2>
        <center>Here you can see the history all your reserves</center>
      </h2>
      <div className="App">
        <div className="card-grid">
          {cards.length === 0 ? (
            <center>You dont have any reserves</center>
          ) : (
            cards.map((card) => (
              <div className="card" data-id={card.id} key={card.id}>

                {/* Display tour name and description */}
                <h2 className="card-title">{`Tour Name: ${card.tour_name}`}</h2>
                <p className="card-description">{`Description: ${card.tour_description}`}</p>
                <p className="card-description">{`Booking Date: ${card.booking_date}`}</p>

                {/* Delete button */}
                <button onClick={() => deleteCard(card.id)}>Delete</button>
                <br />
                <br />
              </div>
            ))
          )}
        </div>
      </div>
      {/* Additional spacing */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

// Export:
// - Exports the Reservation component for usage in the application.
export default Reservation;
