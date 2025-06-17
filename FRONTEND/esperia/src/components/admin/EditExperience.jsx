import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';


export default function EditExperience() {

    const { id } = useParams()
    const [experience, setExperience] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_APIURL}/admin/experiences/${id}`)
            .then(res => res.json())
            .then(data => setExperience(data))
            .catch(err => console.error(err))
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setExperience(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        const res = await fetch(`${import.meta.env.VITE_APIURL}/admin/experiences/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(experience)
        })

        if (res.ok) {
            alert("Esperienza aggiornata con successo")
            navigate(`/my-experiences`)
        } else {
            alert("Errore durante l'aggiornamento")
        }
    }

    if (!experience) return <div>Caricamento...</div>
    return (
        <Container>
            <h2>Modifica Esperienza</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Titolo</Form.Label>
                    <Form.Control
                        name="title"
                        value={experience.title}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                        name="category"
                        value={experience.category}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control
                        name="description"
                        value={experience.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Città</Form.Label>
                    <Form.Control
                        name="city"
                        value={experience.city}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Prezzo (€)</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={experience.price || ""}
                        onChange={(e) =>
                            setExperience((prev) => ({
                                ...prev,
                                price: Number(e.target.value)
                            }))
                        }
                    />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Durata (valore)</Form.Label>
                    <Form.Control
                        name="durationValue"
                        type="number"
                        value={experience.duration?.value || ""}
                        onChange={(e) =>
                            setExperience((prev) => ({
                                ...prev,
                                duration: {
                                    ...prev.duration,
                                    value: e.target.value,
                                },
                            }))
                        }
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Durata (unità)</Form.Label>
                    <Form.Control
                        name="durationUnit"
                        value={experience.duration?.unit || ""}
                        onChange={(e) =>
                            setExperience((prev) => ({
                                ...prev,
                                duration: {
                                    ...prev.duration,
                                    unit: e.target.value,
                                },
                            }))
                        }
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date disponibili (separate da virgola)</Form.Label>
                    <Form.Control
                        name="date"
                        value={experience.date?.join(', ') || ""}
                        onChange={(e) =>
                            setExperience((prev) => ({
                                ...prev,
                                date: e.target.value.split(',').map(d => new Date(d.trim()))
                            }))
                        }
                    />
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label>Immagine</Form.Label>
                    <Form.Control
                        name="image"
                        value={experience.image}
                        onChange={handleChange}
                    />
                </Form.Group>



                <Button type="submit">Salva modifiche</Button>
            </Form>
        </Container>
    );
}
