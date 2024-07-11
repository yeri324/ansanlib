import React, { useContext, useEffect, useState } from 'react';
import axios from "../security/apis/api";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../security/contexts/LoginContextProvider';
import LoginContextConsumer from '../security/contexts/LoginContextConsumer';
import useRealName from '../../hooks/useRealName';

const ReservationForm = () => {
  const navigate = useNavigate();

  const name = useRealName();

  const { isLogin, roles, isLoginInProgress } = useContext(LoginContext);

  useEffect(() => {
    //현재 로그인이 진행중인 경우 아무것도 실행하지 않음.
    if(isLoginInProgress) return;
    if(!isLogin) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    } else if(!roles.isUser) {
      alert("권한이 없습니다.");
      navigate(-1);
    }
  }, [isLogin, roles]);

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
