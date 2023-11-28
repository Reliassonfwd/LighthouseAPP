import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ isLoggedIn, setCurrUser }) => {
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
      if (!response.ok) {
        throw data.error;
      }
      localStorage.removeItem("token");
      setCurrUser(null);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="payments">Payment</Link>
          </li>
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
          <li>
            <Link to="reservation">Active Reserves</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;