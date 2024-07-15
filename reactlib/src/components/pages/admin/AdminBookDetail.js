import React from 'react';
import "./AdminModal.css";
import axios from 'axios';

const AdminBookDetail = ({ isOpen, onClose, book, refreshBookList }) => {
  if (!isOpen) return null;

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/book/${id}`);
      console.log("Delete response:", response.data);
      alert("삭제가 완료되었습니다.");

      // Call the refresh callback
      refreshBookList();

      // Close the modal
      onClose();
    } catch (error) {
      console.error(error);
      alert("삭제 할 수 없습니다. 다시 확인해주세요");
    }
  };

  return (
    <div className="admin-modal" id="admin-modal">
      <div className="modal-dialog" id="admin-modal-dialog">
        <div className="modal-content" id="admin-modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="admin-modal-title">
              도서관 소장 내역
            </h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="modal-body">
            {book && book.libraries && book.libraries.length > 0 ? (
              <table className="table" id="admin-modal-table">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>도서관</th>
                    <th>소장 권수</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {book.libraries.map((lib, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{lib.libName}</td>
                      <td>{lib.count}권</td>
                      <td><button type="button" id="admin-modal-button" className="btn btn-outline-dark" onClick={() => handleDelete(book.id)}>삭제</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>해당 도서에 대한 신청 내역이 없습니다.</p>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={onClose}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookDetail;
