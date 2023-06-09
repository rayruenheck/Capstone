import { useContext, useEffect, useRef } from "react";
import { AdminAuthContext } from "../contexts/AdminAuthProvider";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
const base_api_url = import.meta.env.VITE_APP_BASE_API;

export default function AdminRegister() {
  const adminNameField = useRef<HTMLInputElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { admin, setAdmin } = useContext(AdminAuthContext);

  useEffect(() => {
    if (admin.token) {
      localStorage.setItem("token", JSON.stringify(admin.token));
      localStorage.setItem("adminname", JSON.stringify(admin.adminname));
    }
    if (admin.token || localStorage.getItem("token")) navigate("/");
  }, [admin]);

  async function handleAdminRegisterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch(`${base_api_url}/register-admin`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        adminname: adminNameField.current?.value,
        email: emailField.current?.value,
        password: passwordField.current?.value,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setAdmin({
        loggedIn: true,
        adminname: adminNameField.current?.value || "",
        token: data[0]["admin token"],
      });
      navigate(`/admin`);
    }
  }
  return (
    <>
    <NavBar/>
    <Container className="forms">
    <div className="formContainer">
    <form onSubmit={handleAdminRegisterForm}>
      <label>
        Admin Name:
        <br />
        <input type="text" ref={adminNameField} />
        <br />
      </label><br/>

      <label>
        Email:
        <br />
        <input type="text" ref={emailField} />
        <br />
      </label><br/>

      <label>
        Password:
        <br />
        <input type="text" ref={passwordField} />
        <br />
      </label><br/><br/>

      <button>Register</button>
    </form>
    </div>
    </Container>
    </>
  );
}
