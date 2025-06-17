import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import "../admin/style.css";

const AddExperience = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [durationUnit, setDurationUnit] = useState("");
    const [durationValue, setDurationValue] = useState("");
    const [price, setPrice] = useState("");
    const [city, setCity] = useState("");
    const [dates, setDates] = useState([]);
    const [dateInput, setDateInput] = useState("")
    const [image, setImage] = useState("");
    const [currentUserId, setCurrentUserId] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch(`${import.meta.env.VITE_APIURL}/users/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setCurrentUserId(data._id);
                } else {
                    console.error("Autore non trovato");
                }
            } catch (err) {
                console.error("Errore recupero autore:", err);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Effettua il login prima di pubblicare.");
            return;
        }
        if (dates.length === 0) {
            alert("Aggiungi almeno una data disponibile");
            return;
        }

        const now = new Date();
        const allDatesValid = dates.every((d) => new Date(d) > now);
        if (!allDatesValid) {
            alert("Tutte le date devono essere future.");
            return;
        }


        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("city", city);
        formData.append("price", Number(price));
        formData.append("date", dates.join(","))
        formData.append("duration", JSON.stringify({
            value: Number(durationValue),
            unit: durationUnit
        }));
        formData.append("image", image)
        formData.append("user", currentUserId)

        try {
            const res = await fetch(`${import.meta.env.VITE_APIURL}/admin/experiences/`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || "Errore durante la creazione del post.");
            }

            const result = await res.json();
            alert("Post creato con successo!");

            setTitle("");
            setCategory("");
            setDescription("");
            setCity("");
            setPrice("");
            setDurationUnit("");
            setDurationValue("");
            setDates([]);
            setImage("");
        } catch (err) {
            console.error(err);
            alert("Errore nella pubblicazione del post.");
        }
    };

    return (
        <Container className="new-blog-container">
            <Form className="mt-5" onSubmit={handleSubmit}>
                <Form.Group className="mt-3">
                    <Form.Label>Titolo</Form.Label>
                    <Form.Control
                        size="lg"
                        placeholder="Titolo del post"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select
                        size="lg"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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

                <Form.Group className="mt-3">
                    <Form.Label>Immagine Copertina</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Città</Form.Label>
                    <Form.Control
                        size="lg"
                        placeholder="Città"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </Form.Group>



                <Form.Group className="mt-3">
                    <Form.Label>Descrizione dell'attività</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={8}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Scrivi il contenuto del tuo post..."
                        required
                    />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Label>Durata</Form.Label>
                        <Form.Control
                            type="number"
                            value={durationValue}
                            onChange={(e) => setDurationValue(e.target.value)}
                            placeholder="Durata"
                            required
                        />
                    </Col>
                    <Col>
                        <Form.Label>Unità</Form.Label>
                        <Form.Select
                            value={durationUnit}
                            onChange={(e) => setDurationUnit(e.target.value)}
                            required
                        >
                            <option value="" disabled hidden>Unità</option>
                            <option>ore</option>
                            <option>giorni</option>
                        </Form.Select>
                    </Col>

                </Row>

                <Form.Group className="mt-3">
                    <Form.Label>Prezzo</Form.Label>
                    <InputGroup>
                        <Form.Control
                            size="lg"
                            type="number"
                            placeholder="Prezzo"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />

                        <InputGroup.Text>€</InputGroup.Text>
                    </InputGroup>
                </Form.Group>


                <Form.Group className="mt-3">
                    <Form.Label>Date disponibili</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="date"
                            value={dateInput}
                            onChange={(e) => setDateInput(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={() => {
                                if (dateInput && !dates.includes(dateInput)) {
                                    setDates([...dates, dateInput].sort((a, b)=> new Date(a) - new Date(b)));
                                    setDateInput("");
                                }
                            }}
                        >
                            Aggiungi
                        </Button>
                    </InputGroup>
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



                <Form.Group className="d-flex mt-4 justify-content-end">
                    <Button
                        type="button"
                        size="lg"
                        variant="outline-dark"
                        onClick={() => {
                            setTitle("");
                            setCategory("");
                            setDescription("");
                            setCity("");
                            setPrice("");
                            setDurationUnit("");
                            setDurationValue("");
                            setDates([]);
                            setDateInput("")
                            setImage("");
                        }}

                    >
                        Reset
                    </Button>

                    <Button
                        type="submit"
                        size="lg"
                        variant="dark"
                        style={{ marginLeft: "1em" }}
                    >
                        Invia
                    </Button>
                </Form.Group>
            </Form>
        </Container >
    );
};

export default AddExperience;
