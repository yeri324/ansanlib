import React from 'react';
import "../../admin/page/AdminPage.css";
import moment from 'moment';

const AdminBookRequestTable = ({
  searchResult = [], // Default to an empty array if no search results are provided
  handleSort,
  handleOpenModal,
  className = "", // Class name for custom styling
  excludedColumns = [] // Columns to exclude from the table
}) => {

  // Define columns and their labels
  const columns = [
    { key: 'isbn', label: 'ISBN' },
    { key: 'title', label: '도서' },
    { key: 'author', label: '작가' },
    { key: 'publisher', label: '출판사' },
    { key: 'pub_year', label: '출판년도' },
    { key: 'count', label: '신청 권수' }
  ];

  // Define column styles for better table layout
  const columnStyles = {
    no: { width: '5%' },
    isbn: { width: '20%' },
    title: { width: '25%' },
    author: { width: '20%' },
    publisher: { width: '15%' },
    pub_year: { width: '10%' },
    count: { width: '10%' }
  };

  // Filter columns based on excluded columns
  const filteredColumns = columns.filter(column => !excludedColumns.includes(column.key));

  return (
    <>
      <table className={`admin-table ${className}`}>
        <thead>
          <tr className='admin-th-tr'>
            <th>No</th>
            {filteredColumns.map(column => (
              <th
                key={column.key}
                className='sortable'
                style={columnStyles[column.key]}
                onClick={() => handleSort && handleSort(column.key)}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(searchResult) && searchResult.length > 0 ? (
            searchResult.map((request, index) => (
              <tr key={index} onClick={() => handleOpenModal && handleOpenModal(request)} className='admin-td-tr'>
                <td>{index + 1}</td>
                {filteredColumns.map(column => (
                  <td key={column.key} style={columnStyles[column.key]}>
                    {column.key === 'pub_year' ? (
                      moment(request.pub_date).format('YYYY')
                    ) : (
                      request[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={filteredColumns.length + 1} style={{ textAlign: 'center' }}>
                신청된 도서가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default AdminBookRequestTable;
