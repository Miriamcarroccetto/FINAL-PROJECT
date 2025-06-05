import React, { useEffect, useState } from 'react'
import { Col, Row } from "react-bootstrap";
import ExperienceItem from '../experience-item/ExperienceItem';

export default function ExperienceList({ searchQuery }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APIURL}/experiences`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error("Errore nel recupero delle esperienze")
        }

        const data = await response.json()
        console.log("Dati ricevuti:", data)

        setPosts(data)
        setLoading(false)
      } catch (err) {
        console.error("Errore nel caricamento dei post: ", err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  const filteredPosts = searchQuery
    ? posts.filter(post =>
        (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : posts

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Row>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, i) => (
          <Col
            key={`item-${i}`}
            md={4}
            style={{ marginBottom: 50 }}
          >
            <ExperienceItem key={post.title} {...post} />
          </Col>
        ))
      ) : (
        <p>Nessuna esperienza trovata.</p>
      )}
    </Row>
  )
}
