import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tour from "./pages/Tour";

import Payments from "./pages/Payments";
// import DataComponent from "./components/DataComponent";
import Reservation from "./pages/Reservation";
import "../src/App.css";
import { useState } from "react";
import User from "./components/User";

function App() {
  const [currUser, setCurrUser] = useState(null);
  return (
    <>

      {/* <div className="App">
        <DataComponent />
      </div> */}
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Tour />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="login" element={< User currUser={currUser} setCurrUser={setCurrUser} />} />
        </Route>
      </Routes>

      <div>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Copyright: PROYECTO LIGHTHOUSE </p>
        </footer>
      </div>
    </>
  );
}

export default App;
