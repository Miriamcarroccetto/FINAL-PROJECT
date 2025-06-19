import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Spinner, Alert, Button } from "react-bootstrap"
import EditBookingDate from '../booking/EditBookingDate'
import './style.css'

export default function MyBookingsPage() {

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [editingBooking, setEditingBooking] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            alert("Accedi per vedere le tue prenotazioni")
            navigate("/login")
            return
        }

        fetch(`${import.meta.env.VITE_APIURL}/bookings/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nel recupero delle prenotazioni")
                return res.json()

            })
            .then(data => setBookings(data))
            .catch(() => alert("Errore nel caricamento delle prenotazioni"))
            .finally(() => setLoading(false))
    }, [navigate])

    const handleClick = (experienceId) => {
        if (!experienceId) {
            alert("Esperienza non disponibile");
            return;
        }
        navigate(`/experience/${experienceId}`)
    }

    const handleSaveDate = (newDate) => {
        const token = localStorage.getItem("token");
        fetch(`${import.meta.env.VITE_APIURL}/bookings/${editingBooking._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ bookingDate: newDate, status: "pending" }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Errore nell'aggiornamento della prenotazione");
                return res.json();
            })
            .then((updatedBooking) => {

                setBookings((prev) =>
                    prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
                );
                setEditingBooking(null);
            })
            .catch((e) => alert(e.message));
    };

    const handleEditDate = (booking) => {
        setEditingBooking(booking);
    };

    const handleDeleteBooking = (bookingId) => {
        if (!window.confirm("Sei sicuro di voler cancellare questa prenotazione?")) return;

        const token = localStorage.getItem("token");
        fetch(`${import.meta.env.VITE_APIURL}/bookings/${bookingId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nella cancellazione della prenotazione");

                setBookings((prev) => prev.filter((b) => b._id !== bookingId));
            })
            .catch((e) => alert(e.message));
    };


    const handleCancelEdit = () => {
        setEditingBooking(null);
    };



    if (loading) return <Spinner animation="border" />

    return (
        <div className="page-container bookings-page">
            <h2>Le mie prenotazioni</h2>
            {editingBooking ? (
                <EditBookingDate
                    booking={editingBooking}
                    onSave={handleSaveDate}
                    onCancel={handleCancelEdit}
                />
            ) : bookings.length === 0 ? (
                <Alert variant="info">Non hai ancora effettuato prenotazioni.</Alert>
            ) : (
                bookings.map((booking) => (
                    <Card
                        key={booking._id}
                        className="mb-3"
                        onClick={() => handleClick(booking.experience?._id)}
                    >
                        <Card.Body>
                            <Card.Title>{booking.experience?.title || "Esperienza"}</Card.Title>
                            <Card.Text>
                                <strong>Data:</strong>{" "}
                                {new Date(booking.bookingDate).toLocaleDateString()}
                            </Card.Text>
                            <Card.Text>
                                <strong>Messaggio:</strong> {booking.message || "Nessun messaggio"}
                            </Card.Text>
                            <Card.Text>
                                <strong>Stato:</strong> {booking.status}
                            </Card.Text>

                            <Button onClick={(e) => { e.stopPropagation(); handleEditDate(booking) }} className='btn'> Modifica Data</Button>
                            <Button onClick={(e) => { e.stopPropagation(); handleDeleteBooking(booking._id)  }} className='btn'>Elimina Prenotazione</Button>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
}


