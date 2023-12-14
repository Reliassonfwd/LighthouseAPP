import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";
import "../styles/Modal.css";

const Reservation = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

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

  const deleteCard = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const responseBody = await response.text();
        if (responseBody.trim().length > 0) {
          const parsedResponse = JSON.parse(responseBody);
          console.log("Respuesta del servidor:", parsedResponse);
        }

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

  if (isLoading) {
    return (
      <body>
        <center>
          <div className="spinner"></div>
        </center>
      </body>
    );
  }

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close-button" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <p>notification deleted</p>
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
            <center>No tienes reservas</center>
          ) : (
            cards.map((card) => (
              <div className="card" data-id={card.id} key={card.id}>
                <h2 className="card-title">{`Tour Name: ${card.tour_name}`}</h2>
                <p className="card-description">{`Booking Date: ${card.booking_date}`}</p>
                <button onClick={() => deleteCard(card.id)}>Delete</button>
                <br />
                <br />
              </div>
            ))
          )}
        </div>
      </div>
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

export default Reservation;
