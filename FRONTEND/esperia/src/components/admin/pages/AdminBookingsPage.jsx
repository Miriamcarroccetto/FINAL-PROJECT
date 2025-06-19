import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Spinner, Alert, Form, Row, Col } from "react-bootstrap";
import '../style.css'

export default function AdminBookingsPage() {
  const { experienceId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [successMessage, setSuccessMessage] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APIURL}/admin/bookings/experience/${experienceId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero prenotazioni");
        return res.json();
      })
      .then(setBookings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [experienceId, token]);

  const handleChangeStatus = (bookingId, newStatus) => {
    fetch(`${import.meta.env.VITE_APIURL}/admin/bookings/${bookingId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nell'aggiornamento stato");
        return res.json();
      })
      .then((updatedBooking) => {
        setBookings((prev) =>
          prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
        );
          setSuccessMessage("Stato prenotazione aggiornato con successo!");
     
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch((e) => alert(e.message));
  };

  if (loading)
    return (
      <Container className="text-center my-5" style={{ paddingTop: '70px' }}>
        <Spinner animation="border" />
      </Container>
    );

  if (error)
    return (
      <Container className="my-5" style={{ paddingTop: '70px' }}>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  if (bookings.length === 0)
    return (
      <Container className="my-5" style={{ paddingTop: '70px' }}>
        <Alert variant="warning">Nessuna prenotazione per questa esperienza.</Alert>
      </Container>
    );

  return (
    <Container className="my-5" style={{ paddingTop: '70px' }}>
      <h2>Gestione Prenotazioni</h2>

       {successMessage && (
      <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>
        {successMessage}
      </Alert>
    )} 
      {bookings.map((booking) => (
        <Card key={booking._id} className="mb-3">
          <Card.Body>
            <Row className="mb-2">
              <Col md={8}>
                <Card.Title>
                  {booking.user.firstName} {booking.user.lastName} ({booking.user.email})
                </Card.Title>
              </Col>
              <Col md={4} className="text-md-end">
                <Form.Select
                  value={booking.status}
                  onChange={(e) => handleChangeStatus(booking._id, e.target.value)}
                  aria-label="Cambia stato prenotazione"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
              </Col>
            </Row>

            <Card.Text>
              <strong>Data prenotazione: </strong>
              {new Date(booking.bookingDate).toLocaleDateString()}
            </Card.Text>
            <Card.Text>
              <strong>Messaggio: </strong>
              {booking.message || "-"}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
