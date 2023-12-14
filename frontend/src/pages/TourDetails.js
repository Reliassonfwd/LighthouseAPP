import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Comments from "../components/Comments";
import "../styles/Details.css";

const TourDetails = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTourDetails = async () => {
      if (tourId) {
        try {
          const response = await axios.get(
            `http://localhost:3001/api/v1/tours/${tourId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTour(response.data);
        } catch (error) {
          console.error("Error fetching tour details:", error);
          // Manejar el error según tus necesidades
        }
      }
    };

    fetchTourDetails();
  }, [tourId, token]);

  const handleReserveClick = () => {
    setSelectedTour({
      tourId: tourId,
      name: tour.name,
      price: tour.price,
      includes: tour.includes,
      // Otros detalles del tour que puedas necesitar
    });
  };

  return (
    <div>
      <h1 className="h1div">{tour && tour.name}</h1>
      <p className="pdiv">{tour && tour.description}</p>
      <p className="pdiv">{tour && `Price: $${tour.price}`}</p>
      <p className="pdiv">{tour && tour.duration}</p>
      <p className="pdiv">{tour && `Includes: ${tour.includes}`}</p>
      <br />
      <br />
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
