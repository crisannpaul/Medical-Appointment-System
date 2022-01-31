import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Navigation = () => {
  const client = JSON.parse(localStorage.getItem('client'));
  const loggedIn = client != null;

  const handleLogoutPress = () => {
    localStorage.setItem('client', null);
    window.location.reload();
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">LH Medical</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/book_appointment">Book Appointment</Nav.Link>
            <Nav.Link href="/my_appointments">My Bookings</Nav.Link>
          </Nav>
          {
            loggedIn ? (
              <Nav>
                <NavDropdown title={"Welcome " + client.name.split(" ")[0]} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/view_client">View Profile</NavDropdown.Item>
                  <NavDropdown.Divider/>
                  <NavDropdown.Item
                    href="/"
                    onClick={() => handleLogoutPress()}
                  >Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link eventKey={2} href="/register">
                  Register
                </Nav.Link>
              </Nav>
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;