import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tour from "./pages/Tour";
import Payments from "./pages/Payments";
import Reservation from "./pages/Reservation";
import User from "./components/User";
import TourDetails from "./pages/TourDetails";
import "../src/App.css";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import Login from './pages/Login';

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = jwtDecode(token);
        setCurrUser(user);
        setLoggedIn(true);
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navbar isLoggedIn={currUser} setCurrUser={setCurrUser} />}
        >
          <Route index element={<Tour />} />
          <Route path="payments" element={loggedIn ? <Payments /> : <Login setCurrUser={setCurrUser} />} />
          <Route path="reservation" element={loggedIn ? <Reservation /> : <Login setCurrUser={setCurrUser} />} />
          <Route
            path="login"
            element={<User currUser={currUser} setCurrUser={setCurrUser} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/tour-details/:tourId" element={<TourDetails />} />
        </Route>
      </Routes>

      <div>
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Copyright: PROYECTO LIGHTHOUSE{" "}
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;