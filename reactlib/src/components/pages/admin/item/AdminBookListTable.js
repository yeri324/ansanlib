import React from 'react';
import PropTypes from 'prop-types';
import '../page/AdminPage.css';

const AdminBookListTable = ({ books, onOpenModal, onSort, sortConfig }) => {

  const handleSort = (key) => {
    onSort(key);
  };

  return (
    <table className="admin-table">
      <thead>
        <tr className="admin-th-tr">
          <th>No</th>
          <th className='sortable' onClick={() => handleSort('isbn')}>ISBN</th>
          <th className='sortable' onClick={() => handleSort('title')}>도서 제목</th>
          <th className='sortable' onClick={() => handleSort('author')}>작가</th>
          <th className='sortable' onClick={() => handleSort('publisher')}>출판사</th>
          <th className='sortable' onClick={() => handleSort('pub_date')}>출판년도</th>
          <th>도서 수량</th>

        </tr>
      </thead>
      <tbody>
        {books.length > 0 ? (
          books.map((book, index) => (
            <tr className='list admin-td-tr' key={index} onClick={() => onOpenModal(book)}>
              <td>{index + 1}</td>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.pub_date}</td>
              <td>{book.total_count}</td>
             
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">도서 목록이 없습니다</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

AdminBookListTable.propTypes = {
  books: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.object.isRequired,
};

export default AdminBookListTable;
