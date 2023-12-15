import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  // useNavigate Hook:
  // - Provides a navigate function to handle programmatic navigation.
  const navigate = useNavigate();

  // handleClick Function:
  // - Invoked when the button is clicked.
  // - Uses the `navigate` function to navigate back to the previous page.
  const handleClick = () => {
    navigate("");
  };

  // Render:
  // - Renders a button with the label "Back" that triggers the handleClick function on click.
  return <button onClick={handleClick}>Back</button>;
};

// Export:
// - Exports the BackButton component as the default export.
export default BackButton;
