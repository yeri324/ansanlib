import React from 'react';

const AdminUserItem = ({ user, handleDetail }) => {
    return (
        <tr>
            <td>{user.userId}</td>
            <td onClick={() => handleDetail(user)}>{user.loginid}</td>
            <td>{user.name}</td>
            <td>{user.penalty}</td>
            <td>{user.lateFee}</td>
        </tr>
    );
};

export default AdminUserItem;