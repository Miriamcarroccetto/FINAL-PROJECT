import {Container, Nav, Navbar, NavDropdown, Form, Button, Col, Row} from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../navbar/navbarWeb.css';
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdHome, IoMdLogOut, IoMdMap   } from "react-icons/io";





function NavbarWeb() {
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-light my-navbar">
      <Container>
        <Navbar.Brand href="#home">
            <h1>ESPERIA</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home"> <IoMdHome/> </Nav.Link>
            <Nav.Link href="#link"><IoMdMap/> Le tue esperienze </Nav.Link>
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

        <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Cerca..."
              className=" mr-sm-2"
            />
          </Col>
          <Col>
          <FaRegUserCircle/>
          </Col>
          <Col>
          <IoMdLogOut />
          </Col>
        </Row>
      </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarWeb;
