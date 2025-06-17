import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

      setExperiences((prev) => prev.filter((exp) => exp._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Spinner animation="border" className="m-5" />;

  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;

  return (
    <Container className="my-4">
      <h2>Le tue esperienze pubblicate</h2>
      <Button variant="primary" className="mb-3" onClick={() => navigate("/admin/experience/create")}>
        + Nuova esperienza
      </Button>
      {experiences.length === 0 ? (
        <p>Nessuna esperienza trovata.</p>
      ) : (
        <Row>
          {experiences.map(({ _id, title, city, price, image }) => (
            <Col md={4} key={_id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={image} style={{ height: "180px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>
                    Città: {city} <br />
                    Prezzo: €{price}
                  </Card.Text>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => navigate(`/admin/experience/edit/${_id}`)}
                  >
                    Modifica
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(_id)}>
                    Elimina
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
