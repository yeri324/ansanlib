import React, { useContext, useEffect, useState } from 'react';
import axios from "../security/apis/api";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../security/contexts/LoginContextProvider';
import useRealName from '../../hooks/useRealName';

const ReservationList = () => {
    const navigate = useNavigate();

    const name = useRealName();

    const [reservations, setReservations] = useState([]);
    const [selectedReservations, setSelectedReservations] = useState([]); 
    const [isErrored, setErrored] = useState(false);

    const { isLogin, roles } = useContext(LoginContext);

    useEffect(() => {
        setErrored(!isLogin);
    }, [isLogin]);

    const fetchReservations = async () => {
        if(isLogin) {
            try {
                const response = await axios.get(`/api/reservations/get`); 
                //예약 정보를 셋팅한다.
                setReservations(response.data);
            } catch (error) { //오류 발생시(서버에서 NOT_FOUND(404) 요청 받거나 기타 오류 등등..)
                //오류 발생 플래그 true로 설정
                setErrored(true);
                console.error('Error fetching reservations:', error);
            }
        } else {
            setReservations([]);
            setErrored(true);
        }
    };

    useEffect(() => { fetchReservations(); }, [isLogin]); //이부분은 의존성 배열인데, login 값이 변경될 때 마다 useEffect를 새로 실행하여 예약목록을 업데이트 하도록 함.

    const handleSelectReservation = (reservationId) => {
        setSelectedReservations(prevSelected =>
            prevSelected.includes(reservationId)
                ? prevSelected.filter(id => id !== reservationId)
                : [...prevSelected, reservationId]
        );
    };

    const handleDeleteReservations = async () => {
        try {
            await Promise.all(selectedReservations.map(id =>
                axios.delete(`/api/reservations/delete/${id}`)
            ));
            setReservations(reservations.filter(reservation => !selectedReservations.includes(reservation.id)));
            setSelectedReservations([]);
        } catch (error) {
            console.error('Error deleting reservations:', error);
        }
    };

    const deselectAll = () => setSelectedReservations([]);

    const selectAll = () => setSelectedReservations(reservations.map(({id}) => id));

    return (
        <div>
            <h2>{name}의 예약 목록</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        <input
                            type="checkbox"
                            checked={selectedReservations.includes(reservation.id)}
                            onChange={() => handleSelectReservation(reservation.id)}
                        />
                        <strong>책 제목:</strong> {reservation.book.title} <br />
                        <strong>책 ISBN:</strong> {reservation.book.isbn} <br />
                        <strong>시작 날짜:</strong> {reservation.startDate} <br />
                        <strong>종료 날짜:</strong> {reservation.endDate}
                    </li>
                ))}
            </ul>
            {
                !isErrored &&
                <>
                    <button
                        onClick={selectAll}
                        disabled={selectedReservations.length === reservations.length}
                    >
                        전체 선택
                    </button>
                    <button
                        onClick={deselectAll}
                        disabled={selectedReservations.length === 0}
                    >
                        전체 선택해제
                    </button>
                    <button
                        onClick={handleDeleteReservations}
                        disabled={selectedReservations.length === 0}
                    >
                        예약 삭제
                    </button>
                </>

            }
            {isErrored && <h2>자료를 가져오지 못했습니다.</h2>}
        </div>
    );
};

export default ReservationList;