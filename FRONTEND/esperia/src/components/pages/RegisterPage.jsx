import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import './style.css'

export default function RegisterPage() {


    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        birthday: '',
        password: '',

    });
    
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('')
        setSuccessMsg('')
        try {
            const res = await fetch(`${import.meta.env.VITE_APIURL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Errore nella registrazione");
            }

            setSuccessMsg('Registrazione avvenuta con successo!')
        } catch (err) {
            setErrorMsg(err.message)
        }
    };

    return (
        <Container className="mt-5 page-container" style={{ maxWidth: '400px' }}>
            <h2>Registrati</h2>

            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            {successMsg && <Alert variant="success">{successMsg}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Data di nascita</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="success" >
                    Registrati
                </Button>

            </Form>

            <p className="mt-3">
                Hai già un account? <a href="/login">Accedi qui</a>
            </p>

        </Container>
    );
}