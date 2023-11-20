import { useRef, useEffect } from "react"
import "../styles/Login.css";
import { jwtDecode } from 'jwt-decode';


const Login = ({ setCurrUser, setShow }) => {

  const formRef = useRef()
  const login = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3001/login"
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      const data = await response.json()
      if (!response.ok) { throw data.error }
      localStorage.setItem("token", response.headers.get("Authorization"))
      setCurrUser(data)
    } catch (error) {
      console.log("error", error)
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)
    const userInfo = {
      "user": { email: data.email, password: data.password }
    }
    login(userInfo, setCurrUser)
    e.target.reset()
  }
  const handleClick = e => {
    e.preventDefault()
    setShow(false)
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      // Assuming the decoded token contains the user's ID in a 'sub' property
      const userId = decoded.sub;
      // Fetch the user data from your API
      fetch(`http://localhost:3001/api/v1/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

        .then(response => response.json())
        .then(data => {
          // Set the current user in your application's state
          setCurrUser(data);
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setCurrUser(data);
        })
        .catch(error => {
          console.error('Error:', error);
          if (error.message === 'Network response was not ok') {
            // The token is likely expired, remove it from local storage
            localStorage.removeItem('token');
            // Update your application state to reflect that the user is no longer authenticated
            setCurrUser(null);
          }
        });
    }
  }, [setCurrUser]);



  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        Email: <input type="email" name='email' placeholder="email" />
        <br />
        Password: <input type="password" name='password' placeholder="password" />
        <br />
        <input type='submit' value="Login" />
      </form>
      <br />
      <div>Not registered yet, <a href="#signup" onClick={handleClick} >Signup</a> </div>
    </div>
  )
}
export default Login
