import React from 'react'
import { Col, Image, Row } from "react-bootstrap";


export default function ExperienceAuthor({ name, lastname}) {

 if (!name && !lastname) return null
  return (
     <Row className="mt-2">
      <Col xs="12" className="text-start">
         <small className="text-muted">di {name} {lastname}</small>
      </Col>
    </Row>
  )
}
