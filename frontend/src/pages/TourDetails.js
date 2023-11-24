import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/Details.css"

const TourDetails = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      if (tourId) {
        const response = await axios.get(`http://localhost:3001/api/v1/tours/${tourId}`);
        setTour(response.data);
      }
    };

    fetchTourDetails();
  }, [tourId]);

  return (
    <div>
      <h1 className='h1div'>{tour && tour.name}</h1>
      <p className='pdiv'>{tour && tour.description}</p>
      <p className='pdiv'>{tour && `Price: $${tour.price}`}</p>
      <p className='pdiv'>{tour && tour.duration}</p>
      <br />
      <br />
      <Link className='adiv' to="/Payments">Payment</Link>
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