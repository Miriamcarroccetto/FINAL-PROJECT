import {useEffect, useState} from 'react';
import { Container, FormControl} from 'react-bootstrap';
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
   <Container fluid="sm">
      <h1 className="blog-main-title mb-3">ESPERIA- Esperienze vere, emozioni locali</h1>
       <FormControl
        type="search"
        placeholder="Cerca Esperienza..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4"
        style={{ width: "250px" }}
      />
      <ExperienceList searchQuery={searchQuery}/>
    </Container>
  );
};

