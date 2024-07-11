import React, { useEffect, useState } from 'react';
import axios from "../security/apis/api";
import { useNavigate } from 'react-router-dom';
import useRealName from '../../hooks/useRealName';
import useAuth, { LOGIN_STATUS } from '../../hooks/useAuth';

const ReservationForm = () => {
  const navigate = useNavigate();

  const name = useRealName();

  const { loginStatus } = useAuth();

  useEffect(() => {
    //로그아웃됨.
    if(loginStatus === LOGIN_STATUS.LOGGED_OUT) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
    }
  }, [loginStatus]); //로그인 상태 변경시 useEffect 실행

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
    <form onSubmit={handleSubmit}>
      <h2>{name}의 도서예약</h2>
      {/* <label>
        User Id:
        <input type="text" value={userId ?? ""} readOnly />
      </label> */}
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
