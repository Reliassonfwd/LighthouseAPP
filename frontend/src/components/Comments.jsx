import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/comments.css";

const Comments = ({ tourId, userId, token }) => {
  // State Variables:
  // - comment: Holds the user's input for the comment.
  // - rating: Holds the user's input for the rating, default is set to 1.
  // - comments: Holds the array of comments fetched from the server.
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState([]);

  // handleCommentSubmit Function:
  // - Invoked when the user submits a comment.
  // - Sends a POST request to the server to add the comment.
  // - Updates the state with the new comment upon successful submission.
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

  // useEffect Hook:
  // - Fetches comments for the specific tour when the component mounts or when 'tourId' changes.
  useEffect(() => {
    const fetchComments = async () => {
      const commentsResponse = await axios.get(
        `http://localhost:3001/api/v1/comments?tourId=${tourId}`
      );
      setComments(commentsResponse.data);
    };

    fetchComments();
  }, [tourId]);

  // Render:
  // - Renders a form for users to submit comments and ratings.
  // - Displays fetched comments with tour name, user name, comment text, and rating.
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
        <h1>Please log in to comment</h1>
      )}

      {comments.map((comment, index) => (
        <div key={index} className="comment-container">
          <p className="ratingcomment">
            Tour: {comment.tour && comment.tour.name}
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

// Export:
// - Exports the Comments component as the default export.
export default Comments;
