import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/comments.css";

const Comments = ({ tourId, userId, token }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/comments",
        {
          comment_text: comment,
          rating,
          user_id: userId,
          tour_id: tourId,
        }
      );

      if (response.status === 200) {
        setComment("");
        setRating(1);
        setComments((prevComments) => [...prevComments, response.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      const commentsResponse = await axios.get(
        `http://localhost:3001/api/v1/comments?tourId=${tourId}`
      );
      setComments(commentsResponse.data);
    };

    fetchComments();
  }, [tourId]);

  return (
    <div className="divcomments">
      {token ? (
        <form onSubmit={handleCommentSubmit}>
          <input
            placeholder="Feedback"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <input
            className="rating"
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <button className="buttonfeedback" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <h1>please log in to comment</h1>
      )}

      {comments.map((comment, index) => (
        <div key={index} className="comment-container">
          <p className="ratingcomment">
            tour: {comment.tour && comment.tour.name}
          </p>
          <p className="namecomment">
            Name: {comment.user && comment.user.name}
          </p>
          <p className="commenttext">{comment.comment_text}</p>
          <p className="ratingcomment">Rating: {comment.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
