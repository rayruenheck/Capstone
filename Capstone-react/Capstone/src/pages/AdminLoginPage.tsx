import { useContext, useRef, useEffect } from "react";

import { AdminAuthContext } from "../contexts/AdminAuthProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Container } from "react-bootstrap";
const base_api_url = import.meta.env.VITE_APP_BASE_API;

export default function AdminLoginPage() {
  const adminnameField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const { admin, setAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin.token) {
      localStorage.setItem("token", JSON.stringify(admin.token));
      localStorage.setItem("adminname", JSON.stringify(admin.adminname));
    }
    if (admin.token || localStorage.getItem("token")) navigate("/");
  }, [admin]);

  async function handleAdminLoginForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch(`${base_api_url}/verify-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminname: adminnameField.current?.value,
        password: passwordField.current?.value,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setAdmin({
        loggedIn: true,
        adminname: String(adminnameField.current?.value),
        token: data[0]["admin token"],
      });
    }
  }

  return (
    <>
    <NavBar/>
    <Container className="forms">
    <div className="formContainer">
    <form onSubmit={handleAdminLoginForm}>
      <label>
        Username:
        <br />
        <input placeholder="admindemo" type="text" ref={adminnameField} />
      </label>
      <br />
      <br />
      <label>
        Password:
        <br />
        <input placeholder="123" type="password" ref={passwordField} />
      </label>
      <br />
      <br />
      <button>Sign In</button>
    </form>
    </div>
    </Container>
    
    </>
  );
}
