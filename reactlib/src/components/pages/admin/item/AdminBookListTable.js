import React from 'react';
import PropTypes from 'prop-types';
import '../page/AdminPage.css';

const AdminBookListTable = ({ books, onOpenModal, onSort, sortConfig, excludedColumns = [] }) => {

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

  return (
    <table className="admin-table">
      <thead>
        <tr className="admin-th-tr">
          <th>No</th>
          {filteredColumns.map(column => (
            <th
              key={column.key}
              className={column.key !== 'img' ? 'sortable' : ''}
              onClick={() => column.key !== 'img' && handleSort(column.key)}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {books.length > 0 ? (
          books.map((book, index) => (
            <tr className='admin-td-tr' key={index} onClick={() => onOpenModal(book)}>
              <td>{index + 1}</td>
              {filteredColumns.map(column => (
                <td key={column.key}>
                  {column.key === 'img' ? (
                    book.bookImg ? (
                      <img 
                        src={`http://localhost:8090/images/book/${book.bookImg.imgName}`} 
                        alt="책 이미지" 
                        className="admin-book-cover" 
                      />
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
  excludedColumns: PropTypes.array
};

AdminBookListTable.defaultProps = {
  excludedColumns: []
};

export default AdminBookListTable;
