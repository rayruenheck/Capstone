import  Navbar  from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav'
import { NavLink } from "react-router-dom";
import { Container, Dropdown } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { UserAuthContext } from "../contexts/UserAuthProvider";
import { AdminAuthContext } from "../contexts/AdminAuthProvider";

export default function NavBar() {
  const {user, setUser} = useContext(UserAuthContext)
  const {admin, setAdmin} = useContext(AdminAuthContext)

  useEffect(()=>{
    const storedUserToken = localStorage.getItem('token')
    if(storedUserToken && !user.usertoken){
      setUser({
        username:localStorage.getItem('username')||'',
        usertoken:storedUserToken,
        loggedIn:true
      })
    }
  })
  useEffect(()=>{
    const storedToken = localStorage.getItem('token')
    if(storedToken && !admin.token){
      setAdmin({
        adminname:localStorage.getItem('username')||'',
        token:storedToken,
        loggedIn:true
      })
    }
  })
  return (
    <Navbar bg="info" variant="light">
        <Container>
          <Navbar.Brand as={NavLink} to="/">My Museum</Navbar.Brand>
          <Nav className="me-auto">
            {user.usertoken?(
              <Nav.Link as={NavLink} to="/UserLogout">Logout</Nav.Link>

            ):(
            <>
            <Nav.Link as={NavLink} to="/login">Sign In</Nav.Link>
            <Nav.Link as={NavLink} to="/user-register">Create An Account</Nav.Link>
            </>
            )}
            
            <Nav.Link as={NavLink} to="/events">Events</Nav.Link>
            
            
            {admin.token ? ( 
              <Dropdown>
                <Dropdown.Toggle variant="success">Admin</Dropdown.Toggle>
                  <Dropdown.Menu>
                  <Nav.Link as={NavLink} to="/adminlogout">Logout</Nav.Link>
                  <Nav.Link as={NavLink} to="/admin-event">Add an Event</Nav.Link>
                  <Nav.Link as={NavLink} to="/admin-past-events">Past Events</Nav.Link>
                    
                  </Dropdown.Menu>
              </Dropdown>
            ):(<></>)}
            
          </Nav>
        </Container>
      </Navbar>

  )
}
