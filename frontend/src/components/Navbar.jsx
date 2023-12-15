import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ isLoggedIn, currUser, setCurrUser }) => {
  // Hook to navigate between routes
  const navigate = useNavigate();

  /**
   * Handles the logout process by making a DELETE request to the logout URL.
   * Removes the authorization token from local storage and updates the current user state.
   */
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/logout", {
        method: "delete",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (!response.ok) throw data.error;

      localStorage.removeItem("token");
      setCurrUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  /**
   * Handles the click event for the "Home" link. Prevents the default behavior,
   * navigates to the home route, and reloads the page.
   */
  const handleHomeClick = (event) => {
    event.preventDefault();
    navigate("/");
    window.location.reload();
  };

  // Render:
  return (
    <>
      <nav className="navstyle">
        <ul>
          {/* Home link */}
          <li>
            <Link to="/" onClick={handleHomeClick}>Home</Link>
          </li>

          {/* Conditional rendering for Login/Logout links based on authentication status */}
          {isLoggedIn ? (
            <li className="Log">
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : (
            <li className="Log">
              <Link to="login">Login</Link>
            </li>
          )}

          {/* Conditional rendering for "Reserves" link based on user role */}
          {currUser && currUser.role === 2 && (
            <li>
              <Link to="reservation">Reserves</Link>
            </li>
          )}
        </ul>
      </nav>
      {/* Outlet for rendering nested routes */}
      <Outlet />
    </>
  );
};

// Export:
// - Exports the Navbar component as the default export.
export default Navbar;
