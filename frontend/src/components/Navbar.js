import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ isLoggedIn, setCurrUser }) => {
  const handleLogout = () => {
    // Aquí podrías realizar cualquier lógica adicional antes de cerrar sesión si es necesario
    // Luego, llama a la función setCurrUser para actualizar el estado de inicio de sesión
    setCurrUser(null);
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

          )
          }
          <li>
            <Link to="reservation">About Me</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
