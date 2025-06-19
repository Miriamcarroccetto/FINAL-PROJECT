import { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";

export default function EditBookingDate({ booking, onSave, onCancel }) {
  const availableDates = booking.experience?.date || [];
  const [selectedDate, setSelectedDate] = useState(
    booking.bookingDate ? booking.bookingDate.split("T")[0] : "" 
  );

  const handleSave = () => {
    if (!selectedDate) {
      alert("Seleziona una data valida");
      return;
    }
    onSave(selectedDate);
  };

  return (
    <div className="edit-booking-date">
      <Row className="mb-3">
        <Col>
          <h4>Modifica data prenotazione</h4>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="" disabled>
              -- Seleziona una data --
            </option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        <Col xs="auto" className="me-2">
          <Button variant="primary" onClick={handleSave}>
            Salva
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={onCancel}>
            Annulla
          </Button>
        </Col>
      </Row>
    </div>
  );
}

