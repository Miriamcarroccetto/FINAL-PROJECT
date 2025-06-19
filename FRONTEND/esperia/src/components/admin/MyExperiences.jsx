import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './style.css'

export default function AdminExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchExperiences = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_APIURL}/admin/experiences/my-experiences`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Errore nel recupero delle esperienze");
        }

        const data = await res.json();
        setExperiences(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [token, navigate]);

  const handleClick = (id) => {
    navigate(`/experience/${id}`)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questa esperienza?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_APIURL}/admin/experiences/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Errore durante la cancellazione");
       
      }

      navigate("/admin/experiences/my-experiences")

      setExperiences((prev) => prev.filter((exp) => exp._id !== id));
      
    
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Spinner animation="border" className="m-5" />;

  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;

  return (

    <Container className="my-experiences">
      <h2>Le tue esperienze pubblicate</h2>
      <Button variant="primary" className="mb-3" onClick={() => navigate("/new")}>
        + Nuova esperienza
      </Button>
      {experiences.length === 0 ? (
        <p>Nessuna esperienza trovata.</p>
      ) : (
        <Row>
          {experiences.map(({ _id, title, city, price, image }) => (
            <Col xs={12} sm={6} md={4} lg={3} key={_id} className="mb-4">
              <Card onClick={() => handleClick(_id)} style={{ cursor: 'pointer' }}>
                <Card.Img variant="top" src={image} style={{ height: "180px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    Città: {city} <br />
                    Prezzo: €{price}
                  </Card.Text>

                  <div  className="d-flex flex-wrap gap-2">
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => navigate(`/admin/experiences/${_id}`)}
                  >
                    Modifica
                  </Button>
                  <Button variant="danger" onClick={(e) =>  { e.stopPropagation(); handleDelete(_id)}}>
                    Elimina
                  </Button>

                  <Button
                    variant="info"
                    className="me-2"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      navigate(`/admin/bookings/${_id}`);
                    }}
                  >
                    Gestisci Prenotazioni
                  </Button>
                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
