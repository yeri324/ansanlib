import React from 'react';
import "../../admin/page/AdminPage.css";
import moment from 'moment'; // Add this for date formatting

const AdminBookListTable = ({ books = [], handleSort }) => {
  if (!books.length) {
    return <div>No books available.</div>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr className="admin-th-tr">
          <th>No</th>
          <th className='sortable' onClick={() => handleSort('isbn')}>ISBN</th>
          <th className='sortable' onClick={() => handleSort('title')}>도서</th>
          <th className='sortable' onClick={() => handleSort('author')}>작가</th>
          <th className='sortable' onClick={() => handleSort('publisher')}>출판사</th>
          <th className='sortable' onClick={() => handleSort('pub_date')}>출판년도</th>
          <th className='sortable' onClick={() => handleSort('count')}>도서 권수</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr className="admin-td-tr" key={index}>
            <td>{index + 1}</td>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>{moment(book.pub_date).format('YYYY')}</td> {/* Format the date */}
            <td>{book.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminBookListTable;
