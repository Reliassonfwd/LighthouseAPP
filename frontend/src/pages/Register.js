import { useRef } from "react";
import "../styles/Register.css";

// Register Component
//
// A React component for user registration. Allows users to input registration details
// and sign up for an account.
const Register = ({ setCurrUser, setShow }) => {
  // Create a reference to the registration form
  const formRef = useRef();

  // Function to perform user registration
  const Register = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3001/signup";
    try {
      // Make a POST request to the registration endpoint
      const response = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      // Parse the response data
      const data = await response.json();

      // Check if the response is not successful, and throw an error
      if (!response.ok) {
        throw data.error;
      }

      // Set the user's token in local storage and update the current user
      localStorage.setItem("token", response.headers.get("Authorization"));
      setCurrUser(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Get form data and create user information object
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { name: data.name, email: data.email, password: data.password },
    };

    // Call the Register function for user registration
    Register(userInfo, setCurrUser);

    // Reset the form
    e.target.reset();
  };

  // Function to handle the "Login" link click
  const handleClick = (e) => {
    e.preventDefault();

    // Show the login component
    setShow(true);
  };

  // Render the registration form
  return (
    <div class="register">
      <form ref={formRef} onSubmit={handleSubmit}>
        <h1 class="h1register">REGISTER</h1>

        {/* Input fields for name, email, and password */}
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="E-mail" />
        <input type="password" name="password" placeholder="Password" />

        {/* Submit button */}
        <button type="submit">Signup</button>
      </form>

      {/* "Login" link */}
      <div class="Sigin1">
        Do you already have an account?{" "}
        <a href="#login" onClick={handleClick} class="Sigin">
          Login.
        </a>
      </div>

      {/* Additional spacing */}
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
// - Exports the Register component for usage in the application.
export default Register;
