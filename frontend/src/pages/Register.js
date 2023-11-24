import { useRef } from "react";
import "../styles/Register.css";

const Register = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const Register = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3001/signup";
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
      localStorage.setItem("token", response.headers.get("Authorization"));
      setCurrUser(data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: { email: data.email, password: data.password },
    };
    Register(userInfo, setCurrUser);
    e.target.reset();
  };
  const handleClick = (e) => {
    e.preventDefault();
    setShow(true);
  };
  return (
    <div class="register">
      <form ref={formRef} onSubmit={handleSubmit}>
        <h1 class="h1register">REGISTER</h1>

        <input type="text" name="name" placeholder="Name" />

        <input type="email" name="email" placeholder="E-mail" />

        <input type="password" name="password" placeholder="Password" />

        <button type="submit">Signup</button>
      </form>

      <div class="Sigin1">
        Do you already have an account?{" "}
        <a href="#login" onClick={handleClick} class="Sigin">
          Login.
        </a>
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
export default Register;
