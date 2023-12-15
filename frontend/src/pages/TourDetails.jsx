import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Comments from "../components/Comments";
import "../styles/Details.css";

/**
 * Functional component for displaying details of a specific tour.
 * @returns {JSX.Element} TourDetails component.
 */
const TourDetails = () => {
  // Retrieve tourId from the URL parameters
  const { tourId } = useParams();

  // State variables for managing tour details and selected tour for reservation
  const [tour, setTour] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);

  // Retrieve user ID and token from local storage
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  /**
   * Fetch tour details from the server when the component mounts or when tourId changes.
   */
  useEffect(() => {
    const fetchTourDetails = async () => {
      if (tourId) {
        try {
          // Fetch tour details using the provided tourId
          const response = await axios.get(
            `http://localhost:3001/api/v1/tours/${tourId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Set the tour state with the received data
          setTour(response.data);
        } catch (error) {
          console.error("Error fetching tour details:", error);
          // Handle the error according to your needs
        }
      }
    };

    // Call the fetchTourDetails function
    fetchTourDetails();
  }, [tourId, token]);

  /**
   * Handler function for the Reserve button click.
   * Sets the selectedTour state with relevant details for reservation.
   */
  const handleReserveClick = () => {
    // Prepare the selectedTour object with necessary details
    setSelectedTour({
      tourId: tourId,
      name: tour.name,
      price: tour.price,
      includes: tour.includes,
      Image: tour.image,
      // Add other tour details as needed
    });
  };

  // Rendered JSX for the TourDetails component
  return (
    <div>
      <br />
      <br />
      {/* Display tour details */}
      <center><img
        className="imgcarddetails"
        src={tour && tour.image}
        alt=""
      /></center>
      <h1 className="h1div">{tour && tour.name}</h1>
      <p className="pdiv">{tour && tour.description}</p>
      <p className="pdiv">{tour && `Price: $${tour.price}`}</p>
      <p className="pdiv">{tour && tour.duration}</p>
      <p className="pdiv">{tour && `Includes: ${tour.includes}`}</p>



      <br />
      <br />

      {/* Link to the payment page with selected tour details */}
      <Link
        className="adiv"
        to={{ pathname: `/Payments/${tourId}`, state: { selectedTour } }}
        onClick={handleReserveClick}
      >
        Payment
      </Link>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Comments component with tourId, userId, and token as props */}
      <Comments tourId={tourId} userId={userId} token={token} />

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
    </div>
  );
};

export default TourDetails;
