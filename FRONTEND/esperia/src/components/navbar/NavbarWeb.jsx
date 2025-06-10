import { Container, Nav, Navbar, NavDropdown, Form, Button, Col, Row } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import '../navbar/navbarWeb.css';
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdHome, IoMdLogOut, IoMdMap } from "react-icons/io";
import { isAuthenticated, isAdmin, parseToken, logout } from '../../utils/auth';
import { useEffect, useState } from 'react';





function NavbarWeb() {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const parsed = parseToken()
    setUser(parsed)
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    navigate('/home')
  }
  return (
    <Navbar fixed='top' expand="lg" className="my-navbar">
      <Container>
        <Navbar.Brand as={Link} to='/home'>
          <h1>ESPERIA</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link as={Link} to='/home'> <IoMdHome /> </Nav.Link>

            {isAdmin() && (
              <Button
                as={Link}
                to="/new"
                className='blog-navbar-add-button bg-danger'
                size='md'
              >
                Nuova Esperienza
              </Button>
            )}

            {isAuthenticated() && (
              isAdmin() ? (
                <Nav.Link as={Link} to="/admin/experiences/my-experiences">
                  <IoMdMap /> Le tue esperienze
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/my-bookings">
                  <IoMdMap /> Le tue prenotazioni
                </Nav.Link>
              )
            )}
            <NavDropdown title="Categorie" id="basic-nav-dropdown">

              <NavDropdown.Item as={Link} to="experiences/category/natura-e-avventura">Natura e avventura</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="experiences/category/benessere-e-relax"> Benessere e relax</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="experiences/category/arte-e-creatività"> Arte e creatività</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="experiences/category/eventi-e-spettacoli"> Eventi e spettacoli</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="experiences/category/avventure-urbane">Avventure urbane</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="experiences/category/sport-e-attività-all-aperto">Sport e attività all’aperto</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Form inline={"true"}>
          <Row className="align-items-center">

            <Col>
              {isAuthenticated() ? (
                <span className="d-flex align-items-center gap-2">
                  <span style={{ fontSize: "1.2rem" }}>
                    <FaRegUserCircle />
                  </span>
                  <span>{user?.name}</span>
                </span>
              ) : (
                <Link to="/login">
                  <FaRegUserCircle style={{ cursor: 'pointer' }} />
                </Link>
              )}
            </Col>
            <Col>
              {isAuthenticated() && (
                <IoMdLogOut style={{ cursor: 'pointer' }} onClick={handleLogout} />
              )}
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarWeb;
