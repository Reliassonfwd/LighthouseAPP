import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";
import { Link } from "react-router-dom";
// import TourDetails from "./TourDetails";
import infoimg from "../images/infoimg.jpg";
import IMGINTRO from "../images/IMGINTRO.jpg";
import portada1 from "../images/portada1.jpg";

const Tour = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const cardsPerPage = 14;
  // const [selectedTour, setSelectedTour] = useState(null);
  // const [relatedTours, setRelatedTours] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/v1/tours")
      .then((response) => {
        setCards(response.data);
        // setRelatedTours(response.data.slice(0, 3));
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
      });

  }, []);



  // const handleReservarClick = (tourId) => {
  //   const selectedTour = cards.find((tour) => tour.id === tourId);
  //   setSelectedTour(selectedTour);

  // };

  // const addToCart = (tour) => {
  //   // Lógica para añadir el tour al carrito
  //   // Puedes almacenar esto en el estado global o en el contexto según tus necesidades
  //   console.log("Added to cart:", tour);
  // };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <>
      <div>
        <img className="imginfo" src={portada1} alt="" />
        <img className="imginfo" src={infoimg} alt="" />
        <img className="imginfo" src={IMGINTRO} alt="" />
      </div>

      <div className="App">
        <div className="card-grid">
          {currentCards.map((card) => (
            <div className="card" data-id={card.id} key={card.id}>
              <h2 className="card-title">{card.name}</h2>
              <p className="card-description">{card.description}</p>
              <p className="card-price">{`Price: $${card.price}`}</p>
              <p className="card-duration">{`Duration: ${card.duration}`}</p>
              {/* <Link to={{ pathname: '/tour-details', state: { tourId: card.id } }}>Reservar</Link> */}
              <Link to={`/tour-details/${card.id}`}>Reservar</Link>

            </div>
          ))}
        </div>
        <br />
        <br />
        <br />
        <div>
          <button
            className="pagination"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <br />
          <button
            className="pagination"
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
