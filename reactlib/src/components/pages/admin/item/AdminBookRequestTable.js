// AdminBookRequestTable.js
import React from 'react';
import AdminPagination from '../common/AdminPagination';

const AdminBookRequestTable = ({
  searchResult = [], // 기본값을 빈 배열로 설정
  currentPage,
  itemsPerPage,
  handleSort,
  handleOpenModal,
  totalPages,
  paginate,
  className = "" // 추가: 외부에서 전달받은 클래스명을 적용
}) => {
  return (
    <>
    <table className={`admin-table ${className}`}>
        <thead>
          <tr className='admin-th-tr'>
            <th>No</th>
            <th className='sortable' onClick={() => handleSort('isbn')}>ISBN</th>
            <th className='sortable' onClick={() => handleSort('title')}>도서 제목</th>
            <th className='sortable' onClick={() => handleSort('author')}>작가</th>
            <th className='sortable' onClick={() => handleSort('publisher')}>출판사</th>
            <th className='sortable' onClick={() => handleSort('pub_year')}>출판년도</th>
            <th className='sortable' onClick={() => handleSort('count')}>신청 권수</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(searchResult) && searchResult.length > 0 ? (
            searchResult.map((request, index) => (
              <tr key={index} onClick={() => handleOpenModal(request)} className='admin-td-tr'>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{request.isbn}</td>
                <td>{request.title}</td>
                <td>{request.author}</td>
                <td>{request.publisher}</td>
                <td>{request.pub_year}</td>
                <td>{request.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                신청된 도서가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="admin-pagination">
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default AdminBookRequestTable;
