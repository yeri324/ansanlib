import React from 'react';
import "../../admin/page/AdminPage.css";
import moment from 'moment';

const AdminLoanTable = ({ loan }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr className="admin-th-tr">
          <th>No</th>
          <th>도서</th>
          <th>회원명</th>
          <th>대출일</th>
          <th>반납일</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(loan) && loan.length > 0 ? (
          loan.map((item, index) => (
            <tr key={index} className="admin-td-tr">
              <td>{index + 1}</td>
              <td>{item.book.title}</td>
              <td>{item.libuser.name}</td>
              <td>{moment(item.loanDate).format('YYYY-MM-DD')}</td>
              <td>{moment(item.returnDate).format('YYYY-MM-DD')}</td>
              <td>{item.libuser.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: 'center' }}>
              No loan records found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AdminLoanTable;
