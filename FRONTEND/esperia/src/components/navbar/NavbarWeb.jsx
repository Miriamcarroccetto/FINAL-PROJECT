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
              <Nav.Link as={Link} to="/my-experiences"><IoMdMap /> Le tue esperienze</Nav.Link>
            )}
            <NavDropdown title="Categorie" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Cultura e tradizioni</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Gastronomia e degustazioni
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Natura e avventura</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4"> Benessere e relax</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5"> Arte e creatività</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6"> Eventi e spettacoli</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.7">Avventure urbane</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.8">Sport e attività all’aperto</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Form inline={"true"}>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Control type="text" placeholder="Cerca..." className="mr-sm-2" />
            </Col>
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
