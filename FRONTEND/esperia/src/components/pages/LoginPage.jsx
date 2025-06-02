import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import "../pages/style.css";

export default function LoginPage({ setIsLoggedIn, fetchUsers }) {

  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {

      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      fetchUsers();
      navigate('/home')

    }
  }, [location, navigate, setIsLoggedIn, fetchUsers]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const baseUrl = import.meta.env.VITE_APIURL
      const res = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      let data;
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        throw new Error("Risposta non valida dal server");
      }


      if (!res.ok) {
        throw new Error(data.message || "Credenziali non valide");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        fetchUsers();
      } else {
        console.warn("Nessun token ricevuto dal backend");
      }

      navigate('/home');

    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    
    <Container className="page-container mt-5 pt-5" style={{ maxWidth: '400px' }}>
      <h2>Login</h2>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </Form.Group>
        <Button type="submit" variant="primary">Login</Button>
      </Form>

      <p className="mt-3">
        Non hai un account? <a href="/register">Registrati qui</a>
      </p>

      <p className="mt-3">
        <a href="http://localhost:3001/users/auth/googlelogin">Accedi con Google</a>
      </p>

    </Container>
    
  )
}

