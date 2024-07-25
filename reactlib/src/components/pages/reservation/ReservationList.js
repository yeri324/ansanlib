import React, { useEffect, useState } from 'react';
import useRealName from '../../hooks/useRealName';
import useAuth, { LOGIN_STATUS } from '../../hooks/useAuth';
import RedirectLogin from '../../helpers/RedirectLogin';
import Auth from '../../helpers/Auth';
import './ReservationList.css';
import Header from '../../fragments/header/header';
import Footer from '../../fragments/footer/footer';
import Side from '../myPage/Side';


const ReservationList = () => {
    const name = useRealName();

    const [reservations, setReservations] = useState([]);
    const [selectedReservations, setSelectedReservations] = useState([]);
    const [isErrored, setErrored] = useState(false);

    const { axios } = useAuth();

    const fetchReservations = async () => {
        try {
            const response = await axios.get(`/api/reservations/get`);
            //예약 정보를 셋팅한다.
            console.log(response.data)
            setReservations(response.data);
            setErrored(false);
        } catch (error) { //오류 발생시(서버에서 NOT_FOUND(404) 요청 받거나 기타 오류 등등..)
            //오류 발생 플래그 true로 설정
            setErrored(true);
            console.error('Error fetching reservations:', error);
        }
    };

    useEffect(() => { fetchReservations(); }, []); //이부분은 의존성 배열인데, 컴포넌트가 처음 랜더링될때 한번만 실행함.

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

    const selectAll = () => setSelectedReservations(reservations.map(({ id }) => id));

    return (
        <div className="mypage-container">
            <div className='mypage-header'>
                <h2 className='mypage-header-name'>{name}의 예약 목록</h2>
            </div>
            <div className="reservation_list">
                <table>
                    <thead>
                        <tr>
                            <th>책 제목</th>
                            <th>책 ISBN</th>
                            <th>시작 날짜</th>
                            <th>종료 날짜</th>
                            <th>선택</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation.id}>
                                <td>{reservation.book.title}</td>
                                <td>{reservation.book.isbn}</td>
                                <td>{reservation.startDate.split('T')[0]}</td>
                                <td>{reservation.endDate.split('T')[0]}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedReservations.includes(reservation.id)}
                                        onChange={() => handleSelectReservation(reservation.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!isErrored && (
                    <div className="actions">
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
                    </div>
                )}
                {isErrored && <h2 className="error_message">자료를 가져오지 못했습니다.</h2>}
            </div>
        </div>
    );
};

export default function () {
    return (
        <>
            <RedirectLogin />
            <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
                <Header />
                <div className="MyPage-body">
                    <Side />
                    <ReservationList />
                </div>
                <Footer />
            </Auth>
        </>
    );
};
