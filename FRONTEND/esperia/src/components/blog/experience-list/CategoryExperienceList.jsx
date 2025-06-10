import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import ExperienceItem from '../experience-item/ExperienceItem'
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
  "arte-e-creativita": "Arte e Creatività",
  "eventi-e-spettacoli": "Eventi e Spettacoli",
  "avventure-urbane": "Avventure Urbane",
  "sport-e-attivita-all-aperto": "Sport e Attività all'Aperto"
}

 const readableCategory = categoryLabels[categoryName] || categoryName
  return (
    
    <div className="experience-list">
      <h2>Categoria: {readableCategory}</h2>
      {experiences.map(exp => (
        <ExperienceItem key={exp._id} {...exp} />
      ))}
    </div>
  )
}
