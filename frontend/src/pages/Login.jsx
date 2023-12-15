import { useRef } from "react";
import "../styles/Login.css";
import { jwtDecode } from "jwt-decode";

// Login Component
//
// A React component for user login. Renders a form with email and password input fields.
//
// Props:
// - setCurrUser: Function to update the current user in the parent component's state.
// - setLoggedIn: Function to update the login status in the parent component's state.
// - setShow: Function to control the visibility of the login/signup form in the parent component.
const Login = ({ setCurrUser, setLoggedIn, setShow }) => {
  // Ref to access the form element
  const formRef = useRef();

  // Function to handle user login
  const login = async (userInfo) => {
    const url = "http://localhost:3001/login";
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data.error;
      }
      const token = response.headers.get("Authorization");
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.sub;
      localStorage.setItem("userId", userId);
      setCurrUser(data);
      setLoggedIn(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    login(userInfo);
    e.target.reset();
  };

  // Function to handle signup link click
  const handleClick = () => {
    if (typeof setShow === "function") {
      setShow(false);
    } else {
      console.error("setShow is not a function!");
    }
  };

  // Render:
  // - Displays a login form with email and password input fields.
  // - Includes styling for layout and appearance.
  // - Provides links for signup and additional spacing for styling purposes.
  return (
    <div className="login">
      <form ref={formRef} onSubmit={handleSubmit}>
        <h1 className="h1login">WELCOME!</h1>
        <br />
        <input
          className="inputdata"
          type="email"
          name="email"
          placeholder="E-mail"
        />
        <br />
        <input
          className="inputdata"
          type="password"
          name="password"
          placeholder="Password"
        />
        <input className="buttonlogin" type="submit" value="Login" />
      </form>
      <br />
      <div className="Sigup1">
        Not registered yet,{" "}
        <a className="Sigup" href="#signup" onClick={handleClick}>
          Signup
        </a>{" "}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

// Export:
// - Exports the Login component for usage in the application.
export default Login;
