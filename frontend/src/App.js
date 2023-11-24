import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tour from "./pages/Tour";
import Payments from "./pages/Payments";
import Reservation from "./pages/Reservation";
import User from "./components/User";
import TourDetails from "./pages/TourDetails";
import "../src/App.css";
import { useState } from "react";

function App() {
  const [currUser, setCurrUser] = useState(null);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navbar isLoggedIn={currUser} setCurrUser={setCurrUser} />}
        >
          <Route index element={<Tour />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reservation" element={<Reservation />} />
          <Route
            path="login"
            element={<User currUser={currUser} setCurrUser={setCurrUser} />}
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
