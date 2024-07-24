import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import "./AdminModal.css";

const AdminBookDetail = ({ isOpen, onClose, book, refreshBookList }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedCounts, setEditedCounts] = useState({});
  const [newLibrary, setNewLibrary] = useState({ libName: '', count: '', reg_time: new Date() });
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
        console.log(libName, title);
        const response = await axios.delete(`/api/admin/book/delete`, {
          params: {
            libName: libName,
            title: title
          }
        });
 
        console.log("Delete response:", response.data);
        alert(` ${title} - ${libName} -  삭제가 완료되었습니다.`);
        refreshBookList(); // 도서 목록 새로고침
        onClose(); // 모달 닫기
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
      console.log('count:', editedCounts[libName]); // 디버깅을 위해 추가

      const response = await axios.put('/api/admin/book/update', null, {
        params: {
          libName: libName,
          title: title,
          count: editedCounts[libName]
        }
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
      const response = await axios.post(`/api/admin/book/${book.id}/addLibrary`, {
        libName: newLibrary.libName,
        count: newLibrary.count,
        reg_time: newLibrary.reg_time,
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
      setNewLibrary({ libName: '', count: '', reg_time: new Date() });
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
                          onClick={() => handleDelete(lib.libName, book.title)} // lib.libName과 book.title 전달
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
                        style={{ width: "100px" }} // Adjust the width as needed
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
                    <td>{moment(newLibrary.reg_time).format('YYYY-MM-DD')}</td>
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

export default AdminBookDetail;
