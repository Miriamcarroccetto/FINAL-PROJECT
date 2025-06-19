import React, { useEffect, useState } from 'react'
import { Button, Container, Image, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ExperienceAuthor from './experience-author/ExperienceAuthor';
import './style.css'
import { jwtDecode } from 'jwt-decode'

export default function Experience() {

    const [experience, setExperience] = useState({});
    const [loading, setLoading] = useState(true);
    const [loginAlert, setLoginAlert] = useState(false)

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

        if (!token) {
            setLoginAlert(true)
            setTimeout(() =>{
            navigate(`/login?redirect=/experience/${experience._id}`);
        }, 1000);
            return
        }
        navigate(`/bookings/${experience._id}`)
    }


    return (
        <div className="experience-details-root">
            <Container>
                 <Row className="mb-3">
                 <Col xs={12} md={6}>
                <Image className="experience-details-cover" src={experience.image} fluid />
                </Col>
                <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
                <h1 className="experience-details-title">{experience.title}</h1>

                <div className="experience-details-container">
                    <div className="experience-details-author">
                        <ExperienceAuthor {...experience.user} />
                    </div>

                </div>
                </Col>
                </Row>

                <Row className="experience-info">
                    <Col xs={12} md={6} lg={3} className="detail-item">
                        <strong>Città:</strong> <span>{experience.city}</span>
                    </Col>
                     <Col xs={12} md={6} lg={3} className="detail-item">
                        <strong>Prezzo:</strong> <span>€{experience.price}</span>
                    </Col>
                     <Col xs={12} md={6} lg={3} className="detail-item">
                        <strong>Durata:</strong> <span>{experience.duration?.value} {experience.duration?.unit}</span>
                    </Col>
                     <Col xs={12} md={6} lg={3} className="detail-item">
                        <strong>Date disponibili:</strong> <span> {Array.isArray(experience.date) && experience.date.length > 0
                            ? experience.date.map(d => new Date(d).toLocaleDateString()).join(', ')
                            : "Non specificate"}</span>
                    </Col>

                </Row>
                <Row>
                <Col xs={12}>
                <div className='experience-description'
                    dangerouslySetInnerHTML={{
                        __html: experience.description,
                    }}
                ></div>
                </Col>
                </Row>

                 <Row className="mt-4">
                <Col xs={12} className="d-flex justify-content-center justify-content-md-start gap-2">
               
                {isAdmin ? (
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
                    <>
                        {loginAlert && (
                            <Alert variant="danger" onClose={() => setLoginAlert(false)} dismissible>
                               Accedi per effettuare una prenotazione.
                            </Alert>
                        )}
                        <Button className="btn experience-actions" onClick={handleBooking}>
                            Prenota
                        </Button>
                    </>
                )}
                </Col>
                </Row>

            </Container>
        </div>
    );
}


