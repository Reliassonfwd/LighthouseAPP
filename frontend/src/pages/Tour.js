import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../styles/Home.css";
import { Link } from "react-router-dom";
import logoImg from "../images/lighthouse_logo.png";



const Tour = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const cardsPerPage = 14;

  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/tours')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los datos:', error);
      });
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <div className="App">
        <img className="Logoimg" src={logoImg} alt="Logo" />

        <Link to="/Reservation">
          <h1>RESERVA AHORA!</h1>
        </Link>

        <div className="card-grid">
          {currentCards.map((card) => (
            <div className="card" key={card.id}>
              <h2 className="card-title">{card.name}</h2>
              <p className="card-description">{card.description}</p>
              <p className="card-price">{`Price: ${card.price}`}</p>
              <p className="card-duration">{`Duration: ${card.duration}`}</p>
              <Link className="reserva" to="/Reservation">
                <h1>Reservar</h1>
              </Link>
            </div>
          ))}
        </div>
        <br />
        <br />
        <br />

        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(cards.length / cardsPerPage)}
          >
            Next
          </button>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default Tour;
