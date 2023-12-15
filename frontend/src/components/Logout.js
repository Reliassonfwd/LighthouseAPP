import React from 'react';
import "../styles/Logout.css";
import lighthouse_logo from "../images/lighthouse_logo.png";

const Logout = () => {
  // Render:
  // - Displays a welcome message for the LIGHTHOUSE app.
  // - Shows an image of the LIGHTHOUSE logo.
  // - Includes additional spacing for styling purposes.
  return (
    <div>
      {/* Welcome message */}
      <p className="textintro">
        Welcome to LIGHTHOUSE, where you can find the best options for Maritime Tours
        in the area. Thank you for being part of the family; take advantage and
        live the experience!
      </p>

      {/* LIGHTHOUSE logo image */}
      <img className="imginfo" src={lighthouse_logo} alt="LIGHTHOUSE Logo" />

      {/* Additional spacing for styling */}
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
};

// Export:
// - Exports the Logout component as the default export.
export default Logout;
