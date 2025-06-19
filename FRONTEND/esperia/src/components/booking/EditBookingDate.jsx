import { useState } from "react";

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
      <h4>Modifica data prenotazione</h4>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        <option value="" disabled >-- Seleziona una data --</option>
        {availableDates.map((date) => (
          <option key={date} value={date}>
            {new Date(date).toLocaleDateString()}
          </option>
        ))}
      </select>
      <button onClick={handleSave}>Salva</button>
      <button onClick={onCancel}>Annulla</button>
    </div>
  );
}


