import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "./Logout";
import { useState } from "react";

const User = ({ currUser, setCurrUser, setLoggedIn }) => {
  const [show, setShow] = useState(true);
  if (currUser)
    return (
      <div>
        <Logout setCurrUser={setCurrUser} />
      </div>
    );
  return (
    <div>
      {show ? (
        <Login
          setCurrUser={setCurrUser}
          setShow={setShow}
          setLoggedIn={setLoggedIn}
        /> // Pasar setLoggedIn a Login
      ) : (
        <Register
          setCurrUser={setCurrUser}
          setShow={setShow}
    
        />
      )}
    </div>
  );
};
export default User;
