import { Container, Nav, Navbar, NavDropdown, Form, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../navbar/navbarWeb.css';
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoMdHome, IoMdLogOut, IoMdMap } from "react-icons/io";
import {
  GiForestCamp, GiMeditation, GiPaintBrush, GiMusicalNotes, GiCityCar,
} from "react-icons/gi";

import { useAuth } from '../../utils/AuthProvider';

function NavbarWeb() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.isAdmin;

  return (
    <Navbar expand="lg" className="my-navbar">
      <Container>
        <Navbar.Brand as={Link} to='/home'>
          <h1>ESPERIA</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {(!isAuthenticated || !isAdmin) && (
              <Nav.Link as={Link} to='/home'>
                <IoMdHome className='navbar-icon' />
              </Nav.Link>
            )}

            {isAuthenticated && (
              isAdmin ? (
                <Nav.Link as={Link} to="/admin/experiences/my-experiences">
                  <IoMdMap className='navbar-icon' /> Gestione esperienze
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/my-bookings">
                  <IoMdMap className='navbar-icon' /> Le tue prenotazioni
                </Nav.Link>
              )
            )}

            <NavDropdown title="Categorie" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="experiences/category/natura-e-avventura">
                <GiForestCamp className="me-2" /> Natura e avventura
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="experiences/category/benessere-e-relax">
                <GiMeditation className="me-2" /> Benessere e relax
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="experiences/category/eventi-e-spettacoli">
                <GiMusicalNotes className="me-2" /> Eventi e spettacoli
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="experiences/category/avventure-urbane">
                <GiCityCar className="me-2" /> Avventure urbane
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Form inline={"true"}>
          <Row className="d-flex align-items-center gap-3">
            <Col>
              {isAuthenticated ? (
                <div className="d-flex flex-column align-items-start text-start">
                  <span className="welcome-text">Benvenuto</span>
                  <span className="d-flex align-items-center gap-2">
                    <span>{user?.name}</span>
                    <span style={{ fontSize: "1.2rem" }}>
                      <IoPersonCircleOutline className="navbar-icon" />
                    </span>
                  </span>
                </div>
              ) : (
                <Link to="/login">
                  <IoPersonCircleOutline className="navbar-icon" />
                </Link>
              )}
            </Col>
            <Col>
              {isAuthenticated && (
                <IoMdLogOut className='navbar-icon' onClick={handleLogout} />
              )}
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarWeb;
