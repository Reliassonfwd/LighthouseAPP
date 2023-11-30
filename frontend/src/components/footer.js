import React from 'react';
import './../styles/Footer.css';
import lighthouse_logo from "./../images/lighthouse_logo.png"

const Footercomp = () => {
  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h2>Contact Me</h2>
        <p>Email: info@example.com</p>
        <p>Phone: +123 456 7890</p>
      </div>

      <div className="footer-section">
        <h2>Social Media</h2>
        <p>Follow us on Twitter</p>
        <p>Like us on Facebook</p>
      </div>

      <div className="footer-section">
        <h2>Search</h2>
        <form>
          <input type="text" placeholder="Search..." />
          <button className='searchbutton' type="submit">Go</button>
        </form>
      </div>

      <div className="footer-section">
        <img className='logocompany' src={lighthouse_logo} alt="Logo Company" />
      </div>
    </footer>
  );
}

export default Footercomp;
