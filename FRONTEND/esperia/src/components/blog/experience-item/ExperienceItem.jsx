import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ExperienceAuthor from '../experience-author/ExperienceAuthor'
import './style.css'


export default function ExperienceItem({ title, image, user, _id, price, duration, city, date }) {

  return (
    <Link to={`/experience/${_id}`} className="experience-link">
      <Card className="experience-card h-100">
        <Card.Img variant="top" src={image} className="experience-cover" />
        <Card.Body className="d-flex flex-column">
          <Card.Title  className="fs-5 text-truncate">{title}</Card.Title>
          <Row className='mt-3 experience-info'>

            <Col xs={12} md={6} lg={6} >
              <p className="mb-1"><strong>Città:</strong> {city}</p>
              </Col>

              <Col xs={12} md={6} lg={6} >
              <p className="mb-1"><strong>Prezzo:</strong> €{price}</p>
              </Col>

               <Col xs={12} md={6} lg={6} >
              <p className="mb-1"><strong>Durata:</strong> {duration.value} {duration.unit}</p>
              </Col>

              <Col xs={12} md={6} lg={6} >
              <p className="mb-1"><strong>Date disponibili:</strong> {
                Array.isArray(date) && date.length > 0
                  ? date.slice(0, 3).map(d => new Date(d).toLocaleDateString()).join(', ')
                  : "Non specificate"
              }</p>


            </Col>

          </Row>
        </Card.Body>
        <Card.Footer className="bg-light border-0">
          <ExperienceAuthor {...user} />
        </Card.Footer>
      </Card>
    </Link>
  )
}
