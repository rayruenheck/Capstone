import { useContext, useEffect } from "react";
import { AdminAuthContext } from "../contexts/AdminAuthProvider";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";

export default function AdminLogout() {
  const { setAdmin } = useContext(AdminAuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setAdmin({
      loggedIn: false,
      adminname: "",
      token: "",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("adminname");
    navigate("/admin");
  });

  return <Spinner animation="border" />;
}
