import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Home.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import infoimg from "../images/infoimg.jpg";
import IMGINTRO from "../images/IMGINTRO.jpg";
import portada1 from "../images/portada1.jpg";
import ImageUpload from "../components/formimage";

// Component that manages tours
const Tour = ({ currUser }) => {
  // Form management using react-hook-form
  const { register, handleSubmit, reset } = useForm();

  // State variables
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

  // Handles form submission to create a new tour.
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
        console.error("There was an error creating the tour:", error);
        if (error.response) {
          console.error('Server response:', error.response.data);
        }
      });
  };

  // Handles the selection of a tour for editing.
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
  };

  // Handles form submission to edit an existing tour.
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
  };

  // Edits an existing tour.
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
  };

  // Fetches the list of tours and companies on component mount.
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
        console.error("There was an error fetching data:", error);
        setIsLoading(false);
      });

    axios
      .get("http://localhost:3001/api/v1/companies")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching companies:", error);
      });
  }, []);

  // Deletes a tour.
  const deleteTour = async (id) => {
    const token = localStorage.getItem('token');

    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        await axios.delete(`http://localhost:3001/api/v1/tours/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCards(cards.filter((card) => card.id !== id));
        setCurrentCards(currentCards.filter((card) => card.id !== id));
      } catch (error) {
        console.error("There was an error deleting the tour:", error);
        if (error.response) {
          console.error('Server response:', error.response.data);
        }
      }
    }
  };

// Loading spinner while data is being fetched
if (isLoading) {
  return (
    <body>
      <center>
        <div className="spinner"></div>
      </center>
    </body>
  );
};

// Paginate function to handle pagination logic
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
  const indexOfLastCard = pageNumber * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard));
};

// Rendered JSX for the Tour component
return (
  <>
    {/* Conditional rendering for admin users to edit tours */}
    {currUser && currUser.role === 1 && (
      <form onSubmit={handleEditSubmit}>
        <br />
        <h1> FORMS SECTION </h1>
        <h2>-----EDIT TOUR-----</h2>

        <br />
        <br />
        {/* Input fields for editing tour details */}
        <input type="text" value={tourName} onChange={e => setTourName(e.target.value)} />
        <input type="text" value={tourDescription} onChange={e => setTourDescription(e.target.value)} />
        <input type="number" value={tourPrice} onChange={e => setTourPrice(e.target.value)} />
        <input type="text" value={tourIncludes} onChange={e => setTourIncludes(e.target.value)} />
        <br />
        <br />
        {/* Dropdown for selecting the tour to edit */}
        <select onChange={handleTourChange}>
          {currentCards.map(tour => (
            <option key={tour.id} value={tour.id}>{tour.name}</option>
          ))}
        </select>
        <br />
        <br />
        {/* Submit button to edit the selected tour */}
        <button type="submit">Edit Tour</button>
      </form>
    )}
    <br />
    <br />

    {/* Form for creating a new tour, visible to admin users */}
    <div className="App">
      {currUser && currUser.role === 1 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>-----CREATE TOUR-----</h2>
          {/* Input fields for creating a new tour */}
          <input {...register("name")} placeholder="Tour name" />
          <input {...register("description")} placeholder="Description" />
          <input {...register("price")} placeholder="Price" />
          <input {...register("duration")} placeholder="Tour duration" />
          <input {...register("availability")} placeholder="Availability" />
          <input {...register("quantity")} placeholder="Passengers" />
          <input {...register("includes")} placeholder="Includes" />
          <br />
          {/* Dropdown for selecting the company of the new tour */}
          <select {...register("company_id")}>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>

          <br />
          <br />

          {/* Submit button to create the new tour */}
          <button type="submit">Create tour</button>

          <br />
          <br />
          <br />
          <h2>-----UPLOAD IMAGE-----</h2>
          {/* Component for uploading an image */}
          <ImageUpload />
        </form>
      )}
    </div>

    <br />
    <br />
    <br />

    {/* Images displayed for non-admin users or users with role 2 */}
    {(!currUser || (currUser && currUser.role === 2)) && (
      <div>
        <img className="imginfo" src={portada1} alt="" />
        <img className="imginfo" src={infoimg} alt="" />
        <img className="imginfo1" src={IMGINTRO} alt="" />
      </div>
    )}

    <div className="App">
      {/* Displaying tour cards */}
      <div className="card-grid">
        {currentCards.map((card) => (
          <div className="card" data-id={card.id} key={card.id}>
            <h2 className="card-title">{card.name}</h2>

            {imageLoading && <center>
              <div className="spinner2"></div>
            </center>}

            {/* Image for the tour */}
            <img
              className="imgcard"
              src={card.image}
              alt={card.name}
              onLoad={() => setImageLoading(false)} />

            <p className="card-duration">{card.duration}</p>
            <p className="card-incudes">{`includes: ${card.includes}`}</p>

            {/* Reservation link for non-admin users */}
            {(!currUser || (currUser && currUser.role === 2)) && (
              <Link className="reserva"
                to={{
                  pathname: `/tour-details/${card.id}`,
                  state: { tourId: card.id },
                }}
              >
                Reserve
              </Link>
            )}

            {/* Delete button for admin users */}
            {currUser && currUser.role === 1 && (
              <button onClick={() => deleteTour(card.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>

      <br />
      <br />
      <br />

      {/* Pagination buttons */}
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
