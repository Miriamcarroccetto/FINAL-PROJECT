import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
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
              <p><strong>Date disponibili:</strong> {
                Array.isArray(date) && date.length > 0
                  ? date.slice(0, 3).map(d => new Date(d).toLocaleDateString()).join(', ')
                  : "Non specificate"
              }</p>


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
