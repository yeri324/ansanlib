import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Calendar from 'react-calendar'; 
import './UserResItem.css';
import moment from 'moment';
import './AdminPage.css';
import useAuth, { LOGIN_STATUS, ROLES } from '../../hooks/useAuth';
import Auth from '../../helpers/Auth';
import RedirectLogin from '../../helpers/RedirectLogin';

const UserResItem = ({ res, onClickToCancelRes }) => {
    const { axios } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookRes, setBookRes] = useState([]);
    const [activeStartDate, setActiveStartDate] = useState(new Date());
    const [showPrevButton, setShowPrevButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(true);

    const openModal = () => {
        getBookRes();
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleDateChange = date => {
        console.log(date)
        setSelectedDate(date);
    };

    const isDateReserved = date => {
        const dateformat = date.toISOString().split('T')[0]; // 날짜를 ISO 포맷으로 변환 후 일자만 추출
        const todayformat = new Date().toISOString().split('T')[0];
        return (
            dateformat < todayformat ||
        bookRes.some(reservation => {
            return dateformat >= reservation.startDate.split('T')[0] && dateformat <= reservation.endDate.split('T')[0];
        })
    );
    };

    const handleActiveStartDateChange = ({ activeStartDate }) => {
        const currentMonth = new Date().getMonth();
        const nextMonth = new Date(new Date().setMonth(currentMonth + 1)).getMonth();

        if (activeStartDate.getMonth() === currentMonth) {
            setShowPrevButton(false);
            setShowNextButton(true);
        } else if (activeStartDate.getMonth() === nextMonth) {
            setShowPrevButton(true);
            setShowNextButton(false);
        }
        setActiveStartDate(activeStartDate);
    };

    const extendRes = () => {
        axios(
            {
              url: '/admin/user/extendRes',
              method: 'put',
              data: {
                id: res.id,
                exDate: selectedDate
              },
              baseURL: 'http://localhost:8090',
            })
        .then(response => {
            console.log('예약 연장 성공:');
            closeModal(); 
            window.location.reload();
        }).catch(error => {
            console.error('예약 연장 실패:', error);
        });
    };

    const getBookRes = () => {
        axios(
            {
              url: '/admin/user/bookRes',
              method: 'post',
              data: {
                id: res.bookId.id,
              },
              baseURL: 'http://localhost:8090',
            })
       .then(res => {
            setBookRes(res.data)
        }).catch(error => {
            console.log(error);
        });
    };
    Modal.setAppElement('#root'); // 접근성 설정
    return (
        res ? ( // res가 undefined가 아닌 경우에만 렌더링
            <>
                <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.bookId.title}</td>
                    <td>{res.startDate.split('T')[0]}</td>
                    <td>{res.endDate.split('T')[0]}</td>
                    <td><button type="button" id="adminbtn" className="btn btn-outline-dark" value={res.id} onClick={onClickToCancelRes}>삭제</button></td>
                    <td><button type="button" id="adminbtn" className="btn btn-outline-dark" value={res.id} onClick={openModal}>기간연장</button></td>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={closeModal}
                        contentLabel="연장할 기간을 선택하세요"
                        className="Res-modal"
                    >
                        <div className="Res-modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <h2>예약 연장</h2>
                            <div className='calendar'>
                                <Calendar
                                    onChange={handleDateChange}
                                    value={selectedDate}
                                    next2Label={null}
                                    prev2Label={null}
                                    formatDay={(locale, date) => moment(date).format("DD")}
                                    tileDisabled={({ date }) => isDateReserved(date)}
                                    showNeighboringMonth={false}
                                    activeStartDate={activeStartDate}
                                    onActiveStartDateChange={handleActiveStartDateChange}
                                    nextLabel={showNextButton ? '>' : null}
                                    prevLabel={showPrevButton ? '<' : null} 
                                />
                            </div>
                            <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={extendRes}>연장하기</button>
                        </div>
                    </Modal>
                </tr>
            </>
        ) : null
    );
};

export default UserResItem;
