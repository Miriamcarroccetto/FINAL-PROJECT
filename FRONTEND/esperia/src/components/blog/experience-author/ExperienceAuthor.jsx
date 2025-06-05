import React from 'react'
import { Col, Image, Row } from "react-bootstrap";


export default function ExperienceAuthor({ name, lastname}) {

 if (!name && !lastname) return null
  return (
     <Row>
      <Col>
         <small className="text-muted">di {name} {lastname}</small>
      </Col>
    </Row>
  )
}
