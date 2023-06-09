import { useContext, useEffect } from "react";
import { UserAuthContext } from "../contexts/UserAuthProvider";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";

export default function UserLogout() {
  const { setUser } = useContext(UserAuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setUser({
      loggedIn: false,
      username: "",
      usertoken: "",
    });
    localStorage.removeItem("usertoken");
    localStorage.removeItem("username");
    navigate("/login");
  });

  return <Spinner animation="border" />;
}
