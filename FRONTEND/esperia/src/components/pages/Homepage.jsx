import {useEffect, useState} from 'react';
import { Container, FormControl, Row, Col} from 'react-bootstrap';
import logo from '../assets/logo.png';
import ExperienceList from '../blog/experience-list/ExperienceList';
import './style.css'

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(()=> {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")

    if(token) {
      localStorage.setItem("token", token)

      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value)
    }
  

  return (
   <Container  className="py-4" fluid="sm">
    <Row className="mb-3">
        <Col xs={12}>
      <h1 className="blog-main-title mb-3">ESPERIA- Esperienze locali, emozioni vere</h1>
      </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col xs={10} sm={8} md={6} lg={4}>
       <FormControl
        type="search"
        placeholder="Cerca Esperienza..."
        value={searchQuery}
        onChange={handleSearchChange}
        
      />
      </Col>
       </Row>

       <Row>
        <Col>
      <ExperienceList searchQuery={searchQuery}/>
      </Col>
      </Row>
    </Container>
  );
};

