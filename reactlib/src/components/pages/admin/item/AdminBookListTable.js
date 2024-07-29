import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../page/AdminPage.css';
import BookImg from '../../book/searchBookList/bookImg';

const AdminBookListTable = ({ 
  books, 
  onOpenModal, 
  onSort, 
  sortConfig, 
  excludedColumns = [], 
  currentPage, 
  itemsPerPage 
}) => {
  const [sortedBooks, setSortedBooks] = useState([]);

  useEffect(() => {
    // Sort books by createdDate in descending order (newest first)
    const sortedData = [...books].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    setSortedBooks(sortedData);
  }, [books]);

  const handleSort = (key) => {
    onSort(key);
  };

  const columns = [
    { key: 'img', label: '이미지' },
    { key: 'isbn', label: 'ISBN' },
    { key: 'title', label: '도서 제목' },
    { key: 'author', label: '작가' },
    { key: 'publisher', label: '출판사' },
    { key: 'pub_date', label: '출판년도' },
    { key: 'total_count', label: '도서 수량' }
  ];

  const filteredColumns = columns.filter(column => !excludedColumns.includes(column.key));

  const columnStyles = {
    img: { width: '10%' },
    isbn: { width: '10%' },
    title: { width: '20%' },
    author: { width: '20%' },
    publisher: { width: '15%' },
    pub_date: { width: '10%' },
    total_count: { width: '10%' }
  };

  return (
    <table className="admin-table">
      <thead>
        <tr className="admin-th-tr">
          <th style={{ width: '5%' }}>No</th>
          {filteredColumns.map(column => (
            <th
              key={column.key}
              className={column.key !== 'img' ? 'sortable' : ''}
              style={columnStyles[column.key]}
              onClick={() => column.key !== 'img' && handleSort(column.key)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedBooks && sortedBooks.length > 0 ? (
          sortedBooks.map((book, index) => (
            <tr className='admin-td-tr' key={index} onClick={() => onOpenModal(book)}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              {filteredColumns.map(column => (
                <td key={column.key} className="nowrap" style={columnStyles[column.key]}>
                  {column.key === 'img' ? (
                    book.bookImg && book.bookImg.imgName ? (
                      <BookImg book={book} />
                      // <img src={`http://localhost:8090/images/book/${book.bookImg.imgName}`} alt="책 이미지" className="admin-book-cover" />
                    ) : (
                      <div className="no-image">No Image</div>
                    )
                  ) : (
                    book[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={filteredColumns.length + 1}>도서 목록이 없습니다</td>
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
  excludedColumns: PropTypes.array,
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired
};

export default AdminBookListTable;
