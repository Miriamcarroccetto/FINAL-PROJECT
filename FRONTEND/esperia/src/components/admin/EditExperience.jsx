import React, { useEffect, useState } from 'react';
import { Container, Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';


export default function EditExperience() {

    const { id } = useParams()
    const [experience, setExperience] = useState(null)
    const [preview, setPreview] = useState(null)
    const [dates, setDates] = useState([]);
    const [dateInput, setDateInput] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_APIURL}/experiences/${id}`)
            .then(res => res.json())
            .then(data => {
                setExperience(data);
                if (data.date && Array.isArray(data.date)) {
                    const formattedDates = data.date.map(d => {
                        const dateObj = new Date(d);
                        return dateObj.toISOString().slice(0, 10);
                    });
                    setDates(formattedDates);
                }
            })

            .catch(err => console.error(err))
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setExperience(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setExperience(prev => ({ ...prev, imageFile: file }))

        if (file) {
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
        } else {
            setPreview(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const formData = new FormData();

        formData.append("title", experience.title);
        formData.append("category", experience.category);
        formData.append("description", experience.description);
        formData.append("city", experience.city);
        formData.append("price", experience.price);
        formData.append("duration", JSON.stringify(experience.duration));
        formData.append("date", dates.join(','));
        if (experience.imageFile) {
            formData.append("image", experience.imageFile);
        }

        const res = await fetch(`${import.meta.env.VITE_APIURL}/admin/experiences/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (res.ok) {
            alert("Esperienza aggiornata con successo");
            navigate(`/admin/experiences/my-experiences`);
        } else {
            alert("Errore durante l'aggiornamento");
        }
    };


    if (!experience) return <div>Caricamento...</div>
    return (
        <Container className='mt-5 pt-5'>
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

                <Form.Group className="mt-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select
                        size="lg"
                        name='category'
                        value={experience.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled hidden>Categoria</option>
                        <option>Natura e avventura</option>
                        <option>Benessere e relax</option>
                        <option>Arte e creatività</option>
                        <option>Eventi e spettacoli</option>
                        <option>Avventure urbane</option>
                    </Form.Select>
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

                <Row className="mb-3">
                    <Col xs={6}>
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
                    </Col>


                    <Col xs={6}>
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
                    </Col>
                </Row>

                <Form.Group className="mt-3">
                    <Form.Label>Date disponibili</Form.Label>
                    <Row className="align-items-center">

                        <InputGroup>
                            <Col xs={8} sm={9}>
                                <Form.Control
                                    type="date"
                                    value={dateInput}
                                    onChange={(e) => setDateInput(e.target.value)}
                                />
                            </Col>

                            <Col xs={4} sm={3}>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => {
                                        if (dateInput && !dates.includes(dateInput)) {
                                            setDates([...dates, dateInput].sort((a, b) => new Date(a) - new Date(b)));
                                            setDateInput("");
                                        }
                                    }}
                                >
                                    Aggiungi
                                </Button>
                            </Col>
                        </InputGroup>
                    </Row>
                    <div className="mt-2">
                        {dates.map((d, idx) => (
                            <Button
                                key={idx}
                                variant="outline-danger"
                                size="sm"
                                className="me-2 mt-2"
                                onClick={() =>
                                    setDates(dates.filter((date) => date !== d))
                                }
                            >
                                {d} &times;
                            </Button>
                        ))}
                    </div>
                </Form.Group>

                {experience.image && (
                    <div className="mb-3">
                        <img
                            src={experience.image}
                            alt="Immagine attuale"
                            style={{ maxWidth: '200px', marginBottom: '10px' }}
                        />
                    </div>
                )}


                <Form.Group className="mb-3">
                    <Form.Label>Immagine</Form.Label>
                    <Form.Control
                        type='file'
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Anteprima immagine"
                            style={{ marginTop: '10px', maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', borderRadius: '5px' }}
                        />
                    )}
                </Form.Group>



                <div className="d-flex flex-column flex-sm-row gap-2">
                    <Button type="submit" >
                        Salva modifiche
                    </Button>
                    <Button variant='secondary' className='ms-2 ' onClick={() => navigate((`/admin/experiences/my-experiences`))} >Annulla</Button>
                </div>
            </Form>
        </Container>
    );
}
