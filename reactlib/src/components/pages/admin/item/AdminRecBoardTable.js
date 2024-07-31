import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import "../../admin/page/AdminPage.css";
import moment from 'moment'; // Ensure moment is imported
const AdminRecBoardTable = ({ limit }) => {
  const { axios } = useAuth();
  const [recBoardData, setRecBoardData] = useState([]);

  useEffect(() => {
    fetchRecBoardData();
  }, []);

  const fetchRecBoardData = async () => {
    try {
      const response = await axios.get('/api/admin/book/rec');
      setRecBoardData(response.data); // Ensure response.data contains the array of items
    } catch (error) {
      console.error('Error fetching rec_board data:', error);
      setRecBoardData([]);
    }
  };

  if (!recBoardData || recBoardData.length === 0) {
    return <div>게시물이 없습니다.</div>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr className="admin-th-tr">
          <th>No</th>
          <th>도서</th>
          <th>작가</th>
          <th>내용</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        {recBoardData.slice(0, limit).map((item, index) => (
          <tr className="list admin-td-tr" key={index}>
            <td style={{width:"10%"}}>{index + 1}</td>
            <td>{item.book.title}</td>
            <td style={{width:"10%"}}>{item.book.author}</td>
            <td>{item.content}</td>
            <td style={{width:"10%"}}>{moment(item.pub_date).format('YYYY')}</td> {/* Format the date */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminRecBoardTable;
