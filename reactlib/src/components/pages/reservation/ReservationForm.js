import React, { useState } from 'react';
import useRealName from '../../hooks/useRealName';
import useAuth, { LOGIN_STATUS } from '../../hooks/useAuth';
import Auth from '../../helpers/Auth';
import RedirectLogin from '../../helpers/RedirectLogin';
import Footer from '../../fragments/footer/footer';
import '../../fragments/footer/footer.css';
import Header from '../../fragments/header/header';
import '../../fragments/header/header.css';
import './ReservationForm.css';
import Side from '../myPage/Side';

const ReservationForm = () => {
  const name = useRealName();

  const { axios } = useAuth();

  const [bookId, setBookId] = useState('');
  const [reservationDate, setReservationDate] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reservation = { bookId, reservationDate };
    
    try {
      const response = await axios.post('/api/reservations/create', reservation);
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
    <div className='reservation_form'>
      <h2 className='reservation_form_title'>{name}님의 도서예약</h2>
      <form onSubmit={handleSubmit} className='reservation_form_body'>
        <div className='reservation_form_field'>
          <label htmlFor='bookId'>도서 ID:</label>
          <input
            id='bookId'
            type='text'
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          />
        </div>
        <div className='reservation_form_field'>
          <label htmlFor='reservationDate'>예약 날짜:</label>
          <input
            id='reservationDate'
            type='datetime-local'
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            required
          />
        </div>
        <div className='reservation_form_button'>
          <button type='submit'>예약하기</button>
        </div>
      </form>
    </div>
  );
};

export default function() {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
        <Header />
          <ReservationForm />
          <Side />
        <Footer />
      </Auth>
    </>
  );
};
