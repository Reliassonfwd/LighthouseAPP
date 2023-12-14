import { useRef } from "react";
import "../styles/Login.css";
import { jwtDecode } from "jwt-decode";

const Login = ({ setCurrUser, setLoggedIn, setShow }) => {
  const formRef = useRef();

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

  const handleClick = () => {
    if (typeof setShow === "function") {
      setShow(false);
    } else {
      console.error("setShow is not a function!");
    }
  };

  return (
    <div className="login">
      <form ref={formRef} onSubmit={handleSubmit}>
        <h1 className="h1login">WELCOME!</h1>
        <br />{" "}
        <input
          className="inputdata"
          type="email"
          name="email"
          placeholder="email"
        />
        <br />{" "}
        <input
          className="inputdata"
          type="password"
          name="password"
          placeholder="password"
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
export default Login;
