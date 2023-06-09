import { useContext, useRef, useEffect } from "react";

import { UserAuthContext } from "../contexts/UserAuthProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Container } from "react-bootstrap";

const base_api_url = import.meta.env.VITE_APP_BASE_API;

export default function UserLoginPage() {
  const usernameField = useRef<HTMLInputElement>(null);
  const passwordField = useRef<HTMLInputElement>(null);
  const { user, setUser } = useContext(UserAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.usertoken) {
      localStorage.setItem("usertoken", JSON.stringify(user.usertoken));
      localStorage.setItem("username", JSON.stringify(user.username));
    }
    if (user.usertoken || localStorage.getItem("usertoken")) navigate("/");
  }, [user]);

  async function handleUserLoginForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await fetch(`${base_api_url}/verify-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameField.current?.value,
        password: passwordField.current?.value,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setUser({
        loggedIn: true,
        username: String(usernameField.current?.value),
        usertoken: data[0]["user token"],
      });
    }
  }

  return (
    <>
    <NavBar/>
    <Container className="forms">
    <div className="formContainer">    
    <form onSubmit={handleUserLoginForm}>
      <label>
        Username:
        <br />
        <input placeholder="userdemo" type="text" ref={usernameField} />
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
