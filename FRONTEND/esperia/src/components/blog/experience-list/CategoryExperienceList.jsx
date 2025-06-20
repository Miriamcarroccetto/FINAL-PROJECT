import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ExperienceItem from '../experience-item/ExperienceItem'
import {Row, Col} from 'react-bootstrap';
import './style.css'


export default function CategoryExperienceList() {


    const { categoryName} = useParams()
    const [experiences, setExperiences] = useState([])

    useEffect(()=> {
        fetch(`${import.meta.env.VITE_APIURL}/experiences/category/${categoryName}`)
        .then(res=> res.json())
        .then(data=> setExperiences(data))
   }, [categoryName])

       const categoryLabels = {
    "natura-e-avventura": "Natura e Avventura",
    "benessere-e-relax": "Benessere e Relax",
    "eventi-e-spettacoli": "Eventi e Spettacoli",
    "avventure-urbane": "Avventure Urbane"
}

 const readableCategory = categoryLabels[categoryName] || categoryName
  return (
    
       <div className="experience-list">
      <h2 className="mb-4 text-center">{readableCategory}</h2>
      <Row className="gy-4 justify-content-center">
        {experiences.map(exp => (
          <Col key={exp._id} xs={12} sm={6} md={4} lg={3}>
            <ExperienceItem {...exp} />
          </Col>
        ))}
      </Row>
    </div>
  )
}


