// HolidayListTable.js
import React from "react";
import AdminPagination from '../common/AdminPagination';

const HolidayListTable = ({
  searchResult = [], // 기본값을 빈 배열로 설정
  currentPage,
  itemsPerPage,
  handleSort,
  handleDelete,
  paginate,
  excludedColumns = [], // 추가: 제외할 열을 지정하는 props
  className = "" // 추가: 외부에서 전달받은 클래스명을 적용
}) => {
  // 페이지네이션 관련 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);

  const shouldRenderColumn = (columnName) => !excludedColumns.includes(columnName);

  return (
    <>
   <table className={`admin-table ${className}`}>
        <thead>
          <tr className="admin-th-tr">
            {shouldRenderColumn('No') && <th  style={{ width: '5%' }}>No</th>}

            {shouldRenderColumn('lib_name') && (
              <th
                className="sortable"
                onClick={() => handleSort('lib_name')}
                style={{ width: '30%' }}
              >
                도서관 이름
              </th>
            )}
            {shouldRenderColumn('libNum') && (
              <th
                className="sortable"
                onClick={() => handleSort('libNum')}
                style={{ width: '30%' }}
              >
                도서관 번호
              </th>
            )}
            {shouldRenderColumn('holiday') && (
              <th className="sortable" onClick={() => handleSort('holiday')}>
                휴관일
              </th>
            )}
            {shouldRenderColumn('delete') && <th>삭제</th>}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(currentItems) && currentItems.length > 0 ? (
            currentItems.map((holiday) => (
              <tr key={holiday.id} className="admin-td-tr" style={{ cursor: "default" }}>
                {shouldRenderColumn('No') && <td>{holiday.id}</td>}
                {shouldRenderColumn('lib_name') && <td>{holiday.lib_name}</td>}
                {shouldRenderColumn('libNum') && <td>{holiday.library ? holiday.library.libNum : ''}</td>}
                {shouldRenderColumn('holiday') && <td>{holiday.holiday}</td>}
                {shouldRenderColumn('delete') && (
                  <td>
                    <button type="button" className="btn btn-outline-dark" onClick={() => handleDelete(holiday.id)}>
                      삭제
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={excludedColumns.length === 0 ? 5 : 4} style={{ textAlign: 'center' }}>
                휴관 도서관이 없습니다.
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

export default HolidayListTable;
