import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Calendar from 'react-calendar'; 
import './UserResItem.css';
import moment from 'moment';

const UserResItem = ({ res, onClickToCancelRes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [bookRes, setBookRes] = useState([]);

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
        const dateString = date.toISOString().split('T')[0]; // 날짜를 ISO 포맷으로 변환 후 일자만 추출
        return bookRes.some(reservation => {
            return dateString >= reservation.startDate.split('T')[0] && dateString <= reservation.endDate.split('T')[0];
        });
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

    return (
        <>

        <tr key={res.id}>
            <td>id : {res.id}</td>
            <td> || bookId : {res.bookId.id}</td>
            <td> || {res.startDate}</td>
            <td> || {res.endDate}</td>
            <td><button value={res.id} onClick={onClickToCancelRes}>삭제</button></td>
            <td><button value={res.id} onClick={openModal}>기간연장</button></td>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="연장할 기간을 선택하세요"
                className="modal"
            >
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <h2>예약 연장</h2>
                    <div className='calendar'>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        formatDay={(locale, date) => moment(date).format("DD")} 
                        tileDisabled={({ date }) => isDateReserved(date)}
                    />
                    </div>
                    <button onClick={extendRes}>연장하기</button>

                </div>
            </Modal>
        </tr>
        </>
    );
};

export default UserResItem;