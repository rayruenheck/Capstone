import { useContext, useEffect, useRef } from "react";
import { UserAuthContext } from "../contexts/UserAuthProvider";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
const base_api_url = import.meta.env.VITE_APP_BASE_API;

export default function UserRegister() {
  const userNameField = useRef<HTMLInputElement>(null);
  const emailField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const {user, setUser } = useContext(UserAuthContext);

  useEffect(() => {
    if (user.usertoken) {
      localStorage.setItem("usertoken", JSON.stringify(user.usertoken));
      localStorage.setItem("username", JSON.stringify(user.username));
    }
    if (user.usertoken || localStorage.getItem("usertoken")) navigate("/");
  }, [user]);

  async function handleUserRegisterForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch(`${base_api_url}/register-user`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userNameField.current?.value,
        email: emailField.current?.value,
        password: passwordField.current?.value,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setUser({
        loggedIn: true,
        username: userNameField.current?.value || "",
        usertoken: data[0]["user token"],
      });
      navigate(`/login`);
    }
  }
  return (
    <>
    <NavBar/>
    <Container className="forms">
    <div className="formContainer">  
    <form onSubmit={handleUserRegisterForm}>
      <label>
        Username:
        <br />
        <input type="text" ref={userNameField} />
        <br />
      </label><br />

      <label>
        Email:
        <br />
        <input type="text" ref={emailField} />
        <br />
      </label><br />

      <label>
        Password:
        <br />
        <input type="text" ref={passwordField} />
        <br />
      </label><br /><br />

      <button>Register</button>
    </form>
    </div>
    </Container>
    </>
  );
}
