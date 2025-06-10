import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Spinner, Alert } from "react-bootstrap"
import './style.css'

export default function MyBookingsPage() {

    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=> {
        const token = localStorage.getItem("token")

        if (!token) {
            alert("Accedi per vedere le tue prenotazioni")
            navigate("/login")
            return
        }

        fetch(`${import.meta.env.VITE_APIURL}/bookings/me`, {
            headers: {
                "Authorization": `Bearer${token}`
            }
        })
        .then(res=> {
            if(!res.ok) throw new Error("Errore nel recupero delle prenotazioni")
                return res.json()

        })
        .then(data=> setBookings(data))
        .catch(()=> alert("Errore nel caricamento delle prenotazioni"))
        .finally(() => setLoading(false))
    }, [navigate])

    if (loading) return <Spinner animation="border"/>

  return (
      <div className="page-container">
            <h2>Le mie prenotazioni</h2>
            {bookings.length === 0 ? (
                <Alert variant="info">Non hai ancora effettuato prenotazioni.</Alert>
            ) : (
                bookings.map(booking => (
                    <Card key={booking._id} className="mb-3">
                        <Card.Body>
                            <Card.Title>{booking.experience?.title || "Esperienza"}</Card.Title>
                            <Card.Text><strong>Data:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</Card.Text>
                            <Card.Text><strong>Messaggio:</strong> {booking.message || "Nessun messaggio"}</Card.Text>
                            <Card.Text><strong>Stato:</strong> {booking.status}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
  )
}
