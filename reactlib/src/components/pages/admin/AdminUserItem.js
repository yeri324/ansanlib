import React from 'react';
import "./AdminPage.css";

const AdminUserItem = ({ user, handleDetail }) => {
    return (
        <tr onClick={() => handleDetail(user)} className="admin-td-tr">
            <td >{user.userId}</td>
            <td>{user.loginid}</td>
            <td>{user.name}</td>
            <td>{user.penalty}</td>
            <td>{user.lateFee}</td>
        </tr>
    );
};

export default AdminUserItem;