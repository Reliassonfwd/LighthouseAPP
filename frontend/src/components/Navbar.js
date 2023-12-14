import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";


const Navbar = ({ isLoggedIn, currUser, setCurrUser }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Realizar una solicitud DELETE a la URL de cierre de sesión
      const response = await fetch("http://localhost:3001/logout", {
        method: "delete",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("token"), // Pasar el token de autorización en los encabezados
        },
      });
      const data = await response.json();
      if (!response.ok) throw data.error; // Si la respuesta no es exitosa, lanzar un error
      localStorage.removeItem("token"); // Eliminar el token de la memoria local
      setCurrUser(null); // Establecer el usuario actual en null
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleHomeClick = (event) => {
    event.preventDefault();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <nav className="navstyle">
        <ul>
          <li>
            <Link to="/" onClick={handleHomeClick}>Home</Link>
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
          {currUser && currUser.role === 2 && (
            <li>
              <Link to="reservation">Reserves</Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
