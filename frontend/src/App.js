import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Tour from "./pages/Tour";
import Payments from "./pages/Payments";
import Reservation from "./pages/Reservation";
import User from "./components/User";
import TourDetails from "./pages/TourDetails";
import "../src/App.css";
import { jwtDecode } from 'jwt-decode';
import Login from './pages/Login';
import Footercomp from "./components/footer";
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  // State variables for managing current user and login status
  const [currUser, setCurrUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  async function fetchUserRoles(token, userId) {
    const response = await fetch('http://localhost:3001/api/v1/users_roles', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.error('Error fetching user roles:', response.statusText);
      return;
    }

    const data = await response.json();

    const userRole = data.find(item => item.user_id === Number(userId));

    if (!userRole || !userRole.role_id) {
      console.error('role_id is undefined for user_id:', userId, 'in the response data:', data);
      return;
    }

    console.log('role_id:', userRole.role_id);
    return userRole.role_id;
  }

  /**
   * useEffect hook to fetch user details and roles when the component mounts.
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setLoggedIn(true);

        console.log('currUser:', decodedToken);

        // Fetch user roles and update the currUser state
        fetchUserRoles(token, decodedToken.sub).then(roleId => {
          setCurrUser({ ...decodedToken, role: roleId });
        });

      } catch (ex) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Rendered JSX for the App component
  return (
    <>
      {/* WhatsApp button component */}
      <WhatsAppButton />

      {/* React Router configuration for different routes */}
      <Routes>
        <Route
          path="/"
          element={<Navbar isLoggedIn={currUser} currUser={currUser} setCurrUser={setCurrUser} />}
        >
          <Route index element={<Tour currUser={currUser} />} />
          <Route path="payments/:Id" element={loggedIn ? <Payments /> : <Login setCurrUser={setCurrUser} setLoggedIn={setLoggedIn} />} />
          <Route path="reservation" element={loggedIn ? <Reservation /> : <Login setCurrUser={setCurrUser} setLoggedIn={setLoggedIn} />} />
          <Route
            path="login"
            element={<User currUser={currUser} setCurrUser={setCurrUser} setLoggedIn={setLoggedIn} />}
          />
          <Route path="/tour-details/:tourId" element={<TourDetails />} />
        </Route>
      </Routes>

      {/* Footer component */}
      <div>
        <Footercomp></Footercomp>
      </div>
    </>
  );
}

export default App;
