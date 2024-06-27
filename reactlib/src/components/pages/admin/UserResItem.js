import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Calendar from 'react-calendar'; 

const UserResItem = ({ res, onClickToCancelRes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleDateChange = date => {
        console.log(date)
        setSelectedDate(date);
    };

    const extendReservation = () => {
        axios.post('/admin/user/extendRes', {
            id: res.id,
            newEndDate: selectedDate 
        }).then(response => {
            console.log('예약 연장 성공:', response.data);
            closeModal(); 
        }).catch(error => {
            console.error('예약 연장 실패:', error);
        });
    };

    return (
        <tr key={res.id}>
            <td>{res.id}</td>
            <td>{res.bookId.id}</td>
            <td>{res.startDate}</td>
            <td>{res.endDate}</td>
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
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                    <button onClick={extendReservation}>연장하기</button>
                </div>
            </Modal>
        </tr>
    );
};

export default UserResItem;