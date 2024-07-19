import "./AdminModal.css";
import axios from 'axios';
import React, { useState } from 'react';
import moment from 'moment/moment';

const AdminBookDetail = ({ isOpen, onClose, book, refreshBookList }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedCounts, setEditedCounts] = useState({});

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
      console.error("Delete error:", error);
      alert("삭제 할 수 없습니다. 다시 확인해주세요");
    }
  };

  const handleEdit = (lib) => {
    setEditMode(lib.libName);
    setEditedCounts((prevCounts) => ({
      ...prevCounts,
      [lib.libName]: lib.count,
    }));
  };

  const handleEditChange = (libName, value) => {
    setEditedCounts((prevCounts) => ({
      ...prevCounts,
      [libName]: value,
    }));
  };

  const handleEditSave = async (id, libName) => {
    try {
      const response = await axios.put(`/api/admin/book/${id}`, {
        libName: libName,
        count: editedCounts[libName],
      });
      console.log("Edit response:", response.data);
      alert("수정이 완료되었습니다.");
      setEditMode(null);
      refreshBookList();
    } catch (error) {
      console.error("Edit error:", error);
      alert("수정할 수 없습니다. 다시 확인해주세요");
    }
  };

  const groupLibraries = (libraries) => {
    const grouped = libraries.reduce((acc, lib) => {
      if (!acc[lib.libName]) {
        acc[lib.libName] = { ...lib, count: 0 };
      }
      acc[lib.libName].count += lib.count;
      return acc;
    }, {});

    return Object.values(grouped);
  };

  const groupedLibraries = groupLibraries(book.libraries);

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

          {book && book.imageUrl && (
            <div className="modal-image">
              <img src={book.imageUrl} alt="Book" className="img-fluid" />
            </div>
          )}

          <div className="modal-body">
            {groupedLibraries && groupedLibraries.length > 0 ? (
              <table className="table" id="admin-modal-table">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>도서관</th>
                    <th>소장 권수</th>
                    <th>등록일</th>
                    <th>수정</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedLibraries.map((lib, index) => (
                    <tr key={lib.libName}>
                      <td>{index + 1}</td>
                      <td>{lib.libName}</td>
                      <td>
                        {editMode === lib.libName ? (
                          <input
                            type="number"
                            style={{ width: "100px" }}
                            value={editedCounts[lib.libName] || ''}
                            onChange={(e) => handleEditChange(lib.libName, e.target.value)}
                          />
                        ) : (
                          `${lib.count}권`
                        )}
                      </td>
                      <td>{moment(lib.reg_time).format('YYYY-MM-DD')}</td>
                      <td>
                        {editMode === lib.libName ? (
                          <button
                            type="button"
                            id="admin-modal-button"
                            className="btn btn-outline-dark"
                            onClick={() => handleEditSave(book.id, lib.libName)}
                          >
                            저장
                          </button>
                        ) : (
                          <button
                            type="button"
                            id="admin-modal-button"
                            className="btn btn-outline-dark"
                            onClick={() => handleEdit(lib)}
                          >
                            수정
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          id="admin-modal-button"
                          className="btn btn-outline-dark"
                          onClick={() => handleDelete(book.id)}
                        >
                          삭제
                        </button>
                      </td>
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
