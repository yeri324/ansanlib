import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AdminModal.css";
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';

const AdminBookDetail = ({ isOpen, onClose, book, refreshBookList }) => {
  const { axios: authAxios } = useAuth();
  const [editMode, setEditMode] = useState(null);
  const [editedCounts, setEditedCounts] = useState({});
  const [newLibrary, setNewLibrary] = useState({ libName: '', count: '' });
  const [groupedLibraries, setGroupedLibraries] = useState([]);

  useEffect(() => {
    if (book && book.libraries) {
      setGroupedLibraries(book.libraries);
    }
  }, [book]);

  if (!isOpen) return null;

  const handleDelete = async (libName, title) => {
    if (window.confirm("이 책과 관련된 모든 데이터를 삭제합니다. 삭제하시겠습니까?")) {
      try {
        console.log(`Deleting book: libName=${libName}, title=${title}`);
        const response = await authAxios.delete('/api/admin/book/delete', {
          params: { libName, title }
        });
        console.log("Delete response:", response.data);
        alert(` ${title} - ${libName} -  삭제가 완료되었습니다.`);
        refreshBookList();
        onClose();
      } catch (error) {
        console.error("Delete error:", error.response ? error.response.data : error.message);
        alert("삭제 할 수 없습니다. 다시 확인해주세요");
      }
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

  const handleEditSave = async (libName, title) => {
    try {
      console.log('libName:', libName);
      console.log('title:', title);
      console.log('count:', editedCounts[libName]);

      const response = await authAxios.put('/api/admin/book/update', null, {
        params: { libName, title, count: editedCounts[libName] }
      });

      console.log('Edit response:', response.data);
      alert(`${title} - ${libName} - 수정이 완료되었습니다.`);
      setEditMode(null);
      refreshBookList();
    } catch (error) {
      console.error('Edit error:', error);
      alert('수정할 수 없습니다. 다시 확인해주세요');
    }
  };

  const handleNewLibraryChange = (e) => {
    const { name, value } = e.target;
    setNewLibrary((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddLibrary = async () => {
    if (!newLibrary.libName || !newLibrary.count) {
      alert('도서관 이름과 수량을 입력해주세요.');
      return;
    }

    try {
      const response = await authAxios.post(`/api/admin/book/${book.id}/addLibrary`, {
        libName: newLibrary.libName,
        count: newLibrary.count,
        title: book.title,
        isbn: book.isbn,
        author: book.author,
        publisher: book.publisher,
        pub_date: book.pub_date,
        coverImage: book.coverImage,
      });
      console.log("Add Library response:", response.data);
      alert("도서관이 추가되었습니다.");
      refreshBookList();
      setNewLibrary({ libName: '', count: '' });
    } catch (error) {
      console.error("Add Library error:", error);
      alert("도서관을 추가할 수 없습니다. 다시 확인해주세요");
    }
  };

  return (
    <div className="admin-modal" id="admin-modal">
      <div className="modal-dialog" id="admin-modal-dialog">
        <div className="modal-content" id="admin-modal-content">
          {book && book.coverImage && (
            <div className="modal-image">
              <img src={book.coverImage} alt={book.title} className="img-fluid" />
            </div>
          )}
          <div className="modal-header">
            <h5 className="modal-title" id="admin-modal-title"><strong>{book.title}</strong> - 도서관 소장 내역</h5>
            <button type="button" className="close" onClick={onClose}>&times;</button>
          </div>

          <div className="modal-body">
            {groupedLibraries && groupedLibraries.length > 0 ? (
              <table className="table" id="admin-modal-table">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>도서관</th>
                    <th>소장 권수</th>
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
                      <td>
                        {editMode === lib.libName ? (
                          <button
                            type="button"
                            id="admin-modal-button"
                            className="btn btn-outline-dark"
                            onClick={() => handleEditSave(lib.libName, book.title)}
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
                          onClick={() => handleDelete(lib.libName, book.title)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>{groupedLibraries.length + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="libName"
                        value={newLibrary.libName}
                        onChange={handleNewLibraryChange}
                        placeholder="도서관 이름"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="count"
                        value={newLibrary.count}
                        onChange={handleNewLibraryChange}
                        placeholder="권수"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td colSpan="2">
                      <button
                        type="button"
                        id="admin-modal-button"
                        className="btn btn-outline-dark"
                        onClick={handleAddLibrary}
                      >
                        추가
                      </button>
                    </td>
                  </tr>
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

export default function (props) {
  return (
    <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
      <AdminBookDetail {...props} />
    </Auth>
  );
}
