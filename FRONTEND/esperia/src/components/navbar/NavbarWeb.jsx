import {Container, Nav, Navbar, NavDropdown, Form, Button, Col, Row} from 'react-bootstrap';
import logo from '../assets/logo.png';
import '../navbar/navbarWeb.css';




function NavbarWeb() {
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-light my-navbar">
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo} alt="logo" height="40" className='d-inline-block align-top' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Le tue esperienze </Nav.Link>
            <NavDropdown title="Categorie" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
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
          <Col xs="auto">
            <Button type="submit">Cerca</Button>
          </Col>
        </Row>
      </Form>
      </Container>
    </Navbar>
  );
}

export default NavbarWeb;
