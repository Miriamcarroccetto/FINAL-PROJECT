import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Container, Form, Button, Card, Spinner, Alert, Row, Col} from 'react-bootstrap';
import './style.css'

export default function BookingPage() {
    const { id: experienceId } = useParams();
    const [experience, setExperience] = useState(null);
    const [formData, setFormData] = useState({
        bookingDate: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
   
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_APIURL}/experiences/${experienceId}`)
            .then(res => {
                if (!res.ok) throw new Error("Esperienza non trovata");
                return res.json();
            })
            .then(data => setExperience(data))
            .catch(() => navigate("/404"));
    }, [experienceId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.bookingDate) {
            setError("Seleziona una data");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Accedi per prenotare");
            navigate("/login");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch(`${import.meta.env.VITE_APIURL}/bookings`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    experience: experienceId,
                    bookingDate: formData.bookingDate,
                    message: formData.message
                })
            });

            if (res.ok) {
                alert("Prenotazione effettuata con successo!");
                navigate('/home');
            } else {
                const errorData = await res.json();
                setError("Errore nella prenotazione: " + (errorData.message || res.statusText));
            }
        } catch (err) {
            console.error(err);
            setError("Errore di rete o del server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!experience) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Caricamento esperienza...</p>
            </Container>
        );
    }

    return (
        <Container className="page-container">
            <Card className="p-4 shadow-sm">
                <h2 className="mb-4">Prenota: {experience.title}</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Row className='mb-2'>
                        <Col xs={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date disponibili</Form.Label>
                        <div className="d-flex flex-wrap gap-2">
                            {experience.date && experience.date.length > 0 ? (
                                experience.date.map((date, idx) => {
                                    const formatted = new Date(date).toLocaleDateString();
                                    return (
                                        <Button
                                            key={idx}
                                            variant="outline-primary"
                                            className={`date-button ${formData.bookingDate === date ? "selected-date-button" : ""}`}
                                            onClick={() => setFormData(prev => ({ ...prev, bookingDate: date }))}
                                        >
                                            {formatted}
                                        </Button>

                                    );
                                })
                            ) : (
                                <p>Nessuna data disponibile.</p>
                            )}
                        </div>
                    </Form.Group>
                    </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} md={8}>
                    <Form.Group className="mb-3">
                        <Form.Label>Messaggio (opzionale)</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Scrivi un messaggio per l’host..."
                        />
                    </Form.Group>
                    </Col>
                    </Row>

                      <Row>
                        <Col xs={12} md={4}>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Invio in corso..." : "Conferma prenotazione"}
                    </Button>
                    </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
}
