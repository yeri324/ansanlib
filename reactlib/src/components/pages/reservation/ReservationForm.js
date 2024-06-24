import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
  const [userId, setUserName] = useState('');
  const [bookId, setBookId] = useState('');
  const [reservationDate, setReservationDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reservation = { userId, bookId, reservationDate };
    
    try {
      const response = await axios.post('/api/reservations', reservation);
      alert("예약 성공");
      console.log('Reservation created:', response.data);
    } catch (error) {
      alert("예약 실패");
      console.error('There was an error creating the reservation!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User Name:
        <input type="text" value={userId} onChange={(e) => setUserName(e.target.value)} required />
      </label>
      <label>
        Book Id:
        <input type="text" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
      </label>
      <label>
        Reservation Date:
        <input type="datetime-local" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} required />
      </label>
      <button type="submit">Reserve</button>
    </form>
  );
};

export default ReservationForm;
