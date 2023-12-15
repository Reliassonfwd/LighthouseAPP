import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "./Logout";
import { useState } from "react";

const User = ({ currUser, setCurrUser, setLoggedIn }) => {
  // State to manage the visibility of the Login/Register components
  const [show, setShow] = useState(true);

  // If a user is logged in, render the Logout component
  if (currUser)
    return (
      <div>
        <Logout setCurrUser={setCurrUser} />
      </div>
    );

  // If no user is logged in, render the Login/Register components based on the 'show' state
  return (
    <div>
      {show ? (
        <Login
          setCurrUser={setCurrUser}
          setShow={setShow}
          setLoggedIn={setLoggedIn} // Pass setLoggedIn to Login component
        />
      ) : (
        <Register
          setCurrUser={setCurrUser}
          setShow={setShow}
        />
      )}
    </div>
  );
};

// Export:
// - Exports the User component for usage in the application.
export default User;
