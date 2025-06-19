import React, { useEffect, useState } from 'react'
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ExperienceAuthor from './experience-author/ExperienceAuthor';
import './style.css'
import {jwtDecode} from 'jwt-decode'

export default function Experience() {

    const [experience, setExperience] = useState({});
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token")
    let isAdmin = false
    if (token) {
        const decoded = jwtDecode(token)
        isAdmin = decoded.isAdmin
    }

    useEffect(() => {

        const fetchExperience = async () => {
            try {

                const { id } = params
                const response = await fetch(`${import.meta.env.VITE_APIURL}/experiences/${id}`)

                if (!response.ok) {
                    throw new Error("Esperienza non trovata")
                }

                const data = await response.json()
                setExperience(data)
                setLoading(false)
            } catch (err) {
                console.error("Errore nel caricamento del post: ", err)
                navigate("/404")
            }
        }

        fetchExperience()
    }, [params, navigate])

    if (loading) {
        return <div>loading</div>
    }

    const handleBooking = () => {
        navigate(`/bookings/${experience._id}`)
    }
    return (
        <div className="experience-details-root">
            <Container>
                <Image className="experience-details-cover" src={experience.image} fluid />
                <h1 className="experience-details-title">{experience.title}</h1>

                <div className="experience-details-container">
                    <div className="experience-details-author">
                        <ExperienceAuthor {...experience.user} />
                    </div>

                </div>

                <Row className="experience-info">
                    <Col md={6} lg={4} className="detail-item">
                        <strong>Città:</strong> <span>{experience.city}</span>
                    </Col>
                    <Col md={6} lg={4} className="detail-item">
                        <strong>Prezzo:</strong> <span>€{experience.price}</span>
                    </Col>
                    <Col md={6} lg={4} className="detail-item">
                        <strong>Durata:</strong> <span>{experience.duration?.value} {experience.duration?.unit}</span>
                    </Col>
                    <Col md={6} lg={4} className="detail-item">
                        <strong>Date disponibili:</strong> <span> {Array.isArray(experience.date) && experience.date.length > 0
                            ? experience.date.map(d => new Date(d).toLocaleDateString()).join(', ')
                            : "Non specificate"}</span>
                    </Col>

                </Row>

                <div className='experience-description'
                    dangerouslySetInnerHTML={{
                        __html: experience.description,
                    }}
                ></div>

                {isAdmin? (
                    <div className="experience-actions">
                        <Button
                            variant="warning"
                            className="me-2"
                            onClick={() => navigate(`/admin/experiences/${experience._id}`)}
                        >
                            Modifica
                        </Button>
                        <Button
                            variant="danger"
                            onClick={async () => {
                                if (window.confirm("Sei sicuro di voler eliminare questa esperienza?")) {
                                    const token = localStorage.getItem("token");
                                    const res = await fetch(`${import.meta.env.VITE_APIURL}/admin/experiences/${experience._id}`, {
                                        method: "DELETE",
                                        headers: {
                                            Authorization: `Bearer ${token}`,
                                        },
                                    });
                                    if (res.ok) {
                                        alert("Esperienza eliminata");
                                        navigate("/admin/experiences/my-experiences");
                                    } else {
                                        alert("Errore durante l'eliminazione");
                                    }
                                }
                            }}
                        >
                            Elimina
                        </Button>
                    </div>
                ) : (
                    <Button className="btn experience-actions" onClick={handleBooking}>
                        Prenota
                    </Button>
                )}

            </Container>
        </div>
    );
}


