import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Form,
    Button,
    Card,
    Spinner,
    Alert
} from 'react-bootstrap';

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
            setError("Devi selezionare una data per la prenotazione.");
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
                    <Form.Group className="mb-3">
                        <Form.Label>Data prenotazione</Form.Label>
                        <Form.Control
                            type="date"
                            name="bookingDate"
                            value={formData.bookingDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            required
                        />
                    </Form.Group>

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

                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Invio in corso..." : "Conferma prenotazione"}
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}
