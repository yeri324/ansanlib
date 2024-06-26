import React, { useState } from 'react';
import axios from 'axios';

const UserResItem = ({ res, onClickToCancelRes }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        axios(
            {
                url: '/admin/user/bookRes',
                method: 'post',
                data: {
                    id: res.bookId.id,
                },
                baseURL: 'http://localhost:8090',
            }).then(
                (data)=>{console.log(data.data)}
        )
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // const onClick = (e) => {

    //       
    //     )
    //     window.location.reload(navigate(`/admin/user/detail/${id}`, { repalce: true }));
    // }
    // }

    return (
        <tr key={res.id}>
            <td>{res.id}</td>
            <td>{res.bookId.id}</td>
            <td>{res.startDate}</td>
            <td>{res.endDate}</td>
            <td><button value={res.id} onClick={onClickToCancelRes}>삭제</button></td>
            <td><button value={res.id} onClick={openModal}>기간연장</button></td>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>모달 내용...</p>
                    </div>
                </div>
            )}
        </tr>
    );
};


export default UserResItem;