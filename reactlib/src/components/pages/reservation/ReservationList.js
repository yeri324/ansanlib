import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReservationList = () => {
    const { userId } = useParams();

    const [reservations, setReservations] = useState([]);

    const [isErrored, setErrored] = useState(false);

    useEffect(async () => {
        try {
            //서버에 get 요청으로 사용자 아이디를 보내서 해당 사용자의 예약정보 목록을 받아온다.
            const response = await axios.get(`/api/reservations/get/by-user/${userId}`); // {userId} 부분은 실제 사용자 ID로 대체해야 합니다.
            //예약 정보를 셋팅한다.
            setReservations(response.data);
        } catch (error) { //오류 발생시(서버에서 NOT_FOUND(404) 요청 받거나 기타 오류 등등..)
            //오류 발생 플래그 true로 설정
            setErrored(true);
            console.error('Error fetching reservations:', error);
        }
    }, [userId]); //이부분은 의존성 배열인데, userId 값이 변경될 때 마다 useEffect를 새로 실행하여 예약목록을 업데이트 하도록 함.

    const element = !isErrored ? (
        //오류가 발생하지 않은 경우는 예약목록 표시
        <div>
            <h2>{userId}의 예약 목록</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        <strong>책 ISBN:</strong> {reservation.bookIsbn} <br />
                        <strong>시작 날짜:</strong> {reservation.startDate} <br />
                        <strong>종료 날짜:</strong> {reservation.endDate}
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        //오류가 발생한 경우
        <div>
         <h2>자료를 가져오지 못했습니다.</h2>
        </div>
    );

    return element;
};

export default ReservationList;