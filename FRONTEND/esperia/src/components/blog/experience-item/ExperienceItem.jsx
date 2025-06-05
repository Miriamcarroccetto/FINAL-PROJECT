import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ExperienceAuthor from '../experience-author/ExperienceAuthor'
import './style.css'


export default function ExperienceItem( { title, image, user, _id }) {

  return (
    <Link to={`/experience/${_id}`} className="experience-link">
      <Card className="experience-card">
        <Card.Img variant="top" src={image} className="experience-cover" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <ExperienceAuthor {...user} />
        </Card.Footer>
      </Card>
    </Link>
  )
}
