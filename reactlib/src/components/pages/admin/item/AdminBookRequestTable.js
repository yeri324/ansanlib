import React from 'react';
import "../../admin/page/AdminPage.css";
import moment from 'moment'; // Ensure moment is imported

const AdminBookRequestTable = ({
  searchResult = [], // 기본값을 빈 배열로 설정
  handleSort,
  handleOpenModal,
  className = "", // 추가: 외부에서 전달받은 클래스명을 적용
  excludedColumns = [] // 새로운 prop 추가
}) => {

  const columns = [
    { key: 'isbn', label: 'ISBN' },
    { key: 'title', label: '도서' },
    { key: 'author', label: '작가' },
    { key: 'publisher', label: '출판사' },
    { key: 'pub_year', label: '출판년도' },
    { key: 'count', label: '신청 권수' }
  ];

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
                  <td key={column.key}>
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
