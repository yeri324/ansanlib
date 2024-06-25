import React from 'react';

const UserResItem = ({ res, onClickToCancelRes }) => {
    return (
        <tr key={res.id}>
            <td>{res.id}</td>
            <td>{res.bookId.id}</td>
            <td>{res.startDate}</td>
            <td>{res.endDate}</td>
            <td><button value={res.id} onClick={onClickToCancelRes}>삭제</button></td>
            <td><button value={res.id}>기간연장</button></td>
        </tr>
    );
};


export default UserResItem;