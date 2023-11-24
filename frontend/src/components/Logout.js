import "../styles/Logout.css";
import lighthouse_logo from "../images/lighthouse_logo.png";

const Logout = ({ setCurrUser }) => {
  const logout = async (setCurrUser) => {
    try {
      const response = await fetch("http://localhost:3001/logout", {
        method: "delete",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw data.error;
      }
      localStorage.removeItem("token");
      setCurrUser(null);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    logout(setCurrUser);
  };
  return (
    <div>
      <p className="textintro">
        Welcome to LIGHTHOUSE, here you find the best options for Maritime Tours
        in the area. Thank you for being part of the family, take advantage and
        live the experience!
      </p>
      <img className="imginfo" src={lighthouse_logo} />
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
export default Logout;
