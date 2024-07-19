import React from 'react';
import "../page/AdminUserDetail";

const AdminUserItem = ({ user, handleDetail }) => {
    return (
        <tr onClick={() => handleDetail(user)} className="admin-td-tr">
            <td >{user.userId}</td>
            <td>{user.loginid}</td>
            <td>{user.name}</td>
            <td>{user.phone}</td>
            <td>{user.address}</td>
            <td>{user.address2}</td>
            <td>{user.penalty}</td>
            <td>{user.lateFee}</td>
            <td>{user.sms}</td>
        </tr>
    );
};

export default AdminUserItem;