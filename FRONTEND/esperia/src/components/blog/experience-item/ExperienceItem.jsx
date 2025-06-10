import React from 'react'
import { Card, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ExperienceAuthor from '../experience-author/ExperienceAuthor'
import './style.css'


export default function ExperienceItem({ title, image, user, _id, price, duration, city, date }) {

  return (
    <Link to={`/experience/${_id}`} className="experience-link">
      <Card className="experience-card">
        <Card.Img variant="top" src={image} className="experience-cover" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Row>
            <Col className="experience-info"> 
            <p><strong>Città:</strong> {city}</p>
            <p><strong>Prezzo:</strong> €{price}</p>
            <p><strong>Durata:</strong> {duration.value} {duration.unit}</p>
            <p><strong>Data:</strong> {new Date(date).toLocaleDateString()}</p>
          
          </Col>
         
          </Row>
        </Card.Body>
        <Card.Footer>
          <ExperienceAuthor {...user} />
        </Card.Footer>
      </Card>
    </Link>
  )
}
