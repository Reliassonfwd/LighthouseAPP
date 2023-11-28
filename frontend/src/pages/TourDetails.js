import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/Details.css"

const TourDetails = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const userId = localStorage.getItem('userId');
  const [comments, setComments] = useState([]);


  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    console.log('userId:', userId);
    console.log('tourId:', tourId);
    console.log('comment:', comment);
    console.log('rating:', rating);

    if (!userId || !tourId || !comment || rating < 1 || rating > 10) {
      console.error('Invalid input values');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/v1/comments', {
        comment_text: comment,
        rating,
        user_id: userId,
        tour_id: tourId,
      });

      if (response.status === 200) {
        setComment('');
        setRating(1);
        setComments(prevComments => [...prevComments, response.data]); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTourDetails = async () => {
      if (tourId) {
        const response = await axios.get(`http://localhost:3001/api/v1/tours/${tourId}`);
        setTour(response.data);


        const commentsResponse = await axios.get(`http://localhost:3001/api/v1/comments?tourId=${tourId}`);
        setComments(commentsResponse.data);
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

      <form onSubmit={handleCommentSubmit}>
        <input placeholder='Feedback' value={comment} onChange={e => setComment(e.target.value)} />
        <input className='rating' type="number" min="1" max="10" value={rating} onChange={e => setRating(e.target.value)} />
        <button className='buttonfeedback' type="submit">Submit</button>
      </form>
      <br />
      <br />
      <div className='divcomments'>
        {comments.map((comment, index) => (
          <div key={index}>
            <p className='ratingcomment' >tour: {comment.tour && comment.tour.name}</p>
            <p className='namecomment' >Name: {comment.user && comment.user.name}</p>
            <p className='commenttext'>{comment.comment_text}</p>
            <p className='ratingcomment'>Rating: {comment.rating}</p>
          </div>
        ))}
      </div>
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