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
      if(typeof error.response.data === "string") {
        alert(`예약 실패: ${error.response.data}`);
      } else {
        alert(`예약 실패: 서버 내부 오류.`);
      }
      
      console.error('There was an error creating the reservation!', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>도서예약</h2>
      <label>
        User Id:
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
