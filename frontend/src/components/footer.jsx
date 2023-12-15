import React from 'react';
import './../styles/Footer.css';
import lighthouse_logo from "./../images/lighthouse_logo.png"

const Footercomp = () => {
  // Render:
  // - Renders a footer containing contact information, social media links, and a company logo.
  return (
    <footer className="footer-container">
      {/* Contact Information Section */}
      <div className="footer-section">
        <h2>Contact Me</h2>
        <p>Email: <a href="mailto:info@example.com">lighthouse@administration.com</a></p>
        <p>Phone: <a href="tel:+1234567890">+506 456 7890</a></p>
      </div>

      {/* Social Media Section */}
      <div className="footer-section">
        <h2>Social Media</h2>
        <p>Follow us on <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">Twitter</a></p>
        <p>Like us on <a href="https://www.facebook.com/yourusername" target="_blank" rel="noopener noreferrer">Facebook</a></p>
      </div>

      {/* Company Logo Section */}
      <div className="footer-section">
        <img className='logocompany' src={lighthouse_logo} alt="Logo Company" />
      </div>
    </footer>
  );
}

// Export:
// - Exports the Footercomp component as the default export.
export default Footercomp;
