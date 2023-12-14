import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import infoimg from "../images/infoimg.jpg";
import IMGINTRO from "../images/IMGINTRO.jpg";
import portada1 from "../images/portada1.jpg";
import ImageUpload from "../components/formimage"


const Tour = ({ currUser }) => {
  const { register, handleSubmit, reset } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [companies, setCompanies] = useState([]);
  const cardsPerPage = 14;
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState(null);
  const [tourName, setTourName] = useState('');
  const [tourDescription, setTourDescription] = useState('');
  const [tourPrice, setTourPrice] = useState('');
  const [tourIncludes, setTourIncludes] = useState('');


  const onSubmit = (data) => {
    const token = localStorage.getItem('token');
    reset();
    window.location.reload();

    const tourData = {
      tour: {
        ...data
      }
    };

    axios
      .post("http://localhost:3001/api/v1/tours", tourData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setCurrentCards([...currentCards, response.data]);
      })
      .catch(error => {
        console.error("Hubo un error al crear el tour:", error);
        if (error.response) {
          console.error('Server response:', error.response.data);
        }
      });
  };

  const handleTourChange = (event) => {
    const tourId = event.target.value;
    const tour = currentCards.find(tour => tour.id.toString() === tourId);
    if (tour) {
      setSelectedTour(tour);
      setTourName(tour.name);
      setTourDescription(tour.description);
      setTourPrice(tour.price);
      setTourIncludes(tour.includes);
    } else {
      console.error(`No tour found with ID ${tourId}`);
    }
  }
  const handleEditSubmit = (event) => {
    event.preventDefault();
    const updatedTour = {
      name: tourName,
      description: tourDescription,
      price: tourPrice,
      includes: tourIncludes
    };
    editTour(selectedTour.id, updatedTour);

    setTourName('');
    setTourDescription('');
    setTourPrice('');
    setTourIncludes([]);
    window.location.reload();
  }


  const editTour = (id, updatedTour) => {
    axios.put(`http://localhost:3001/api/v1/tours/${id}`, updatedTour)
      .then(response => {
        if (response.status === 200) {
          console.log('Tour updated successfully');
        }
      })
      .catch(error => {
        console.error('Error updating tour:', error);
      });
  }



  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/api/v1/tours")
      .then((response) => {
        setCards(response.data);
        setCurrentCards(response.data.slice(0, cardsPerPage));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los datos:", error);
        setIsLoading(false);
      });


    axios
      .get("http://localhost:3001/api/v1/companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las compañías:", error);
      });
  }, []);



  const deleteTour = async (id) => {
    const token = localStorage.getItem('token');

    if (window.confirm("¿Estás seguro de eliminar este tour?")) {
      try {
        await axios.delete(`http://localhost:3001/api/v1/tours/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCards(cards.filter((card) => card.id !== id));
        setCurrentCards(currentCards.filter((card) => card.id !== id));
      } catch (error) {
        console.error("Hubo un error al eliminar el tour:", error);
        if (error.response) {
          console.error('Server response:', error.response.data);
        }
      }
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
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const indexOfLastCard = pageNumber * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard));
  };


  return (
    <>

      {currUser && currUser.role === 1 && (

        <form onSubmit={handleEditSubmit}>
          <br />
          <h1> FORMS SECTION </h1>
          <h2>-----EDIT TOUR-----</h2>

          <br />
          <br />
          <input type="text" value={tourName} onChange={e => setTourName(e.target.value)} />
          <input type="text" value={tourDescription} onChange={e => setTourDescription(e.target.value)} />
          <input type="number" value={tourPrice} onChange={e => setTourPrice(e.target.value)} />
          <input type="text" value={tourIncludes} onChange={e => setTourIncludes(e.target.value)} />
          <br />
          <br />
          <select onChange={handleTourChange}>
            {currentCards.map(tour => (
              <option key={tour.id} value={tour.id}>{tour.name}</option>
            ))}
          </select>
          <br />
          <br />
          <button type="submit">Editar Tour</button>
        </form>
      )}
      <br />
      <br />

      <div className="App">
        {currUser && currUser.role === 1 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>-----CREATE TOUR-----</h2>
            <input {...register("name")} placeholder="Name tour" />
            <input {...register("description")} placeholder="Description tour" />
            <input {...register("price")} placeholder="Price tour" />
            <input {...register("duration")} placeholder="Duracition tour" />
            <input {...register("availability")} placeholder="Available tour" />
            <input {...register("quantity")} placeholder="amounts tours" />
            <input {...register("includes")} placeholder="includes" />
            <br />
            <select {...register("company_id")}>
              {companies.map((company) => (
                <option value={company.id}>{company.name}</option>
              ))}
            </select>

            <br />
            <br />

            <button type="submit">Create tour</button>

            <br />
            <br />
            <br />
            <h2>-----UPLOAD IMAGE-----</h2>
            <ImageUpload />
          </form>
        )}
      </div>

      <br />
      <br />
      <br />

      {(!currUser || (currUser && currUser.role === 2)) && (
        <div>

          <img className="imginfo" src={portada1} alt="" />
          <img className="imginfo" src={infoimg} alt="" />
          <img className="imginfo1" src={IMGINTRO} alt="" />

        </div>
      )}


      <div className="App">
        <div className="card-grid">
          {currentCards.map((card) => (
            <div className="card" data-id={card.id} key={card.id}>
              <h2 className="card-title">{card.name}</h2>

              {imageLoading && <center>
                <div className="spinner2"></div>
              </center>}


              <img
                className="imgcard"
                src={card.image}
                alt={card.name}
                onLoad={() => setImageLoading(false)} />

              <p className="card-duration">{card.duration}</p>
              <p className="card-incudes">{`includes: ${card.includes}`}</p>


              {(!currUser || (currUser && currUser.role === 2)) && (
                <Link className="reserva"
                  to={{
                    pathname: `/tour-details/${card.id}`,
                    state: { tourId: card.id },
                  }}
                >
                  Reservar
                </Link>
              )}


              {currUser && currUser.role === 1 && (
                <button onClick={() => deleteTour(card.id)}>Delete</button>
              )}

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