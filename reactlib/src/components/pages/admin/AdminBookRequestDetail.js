import React, { useState, useEffect } from 'react';
import './AdminModal.css';
import useAuth, { LOGIN_STATUS, ROLES } from '../../hooks/useAuth';
import Auth from '../../helpers/Auth';
import RedirectLogin from '../../helpers/RedirectLogin';




const AdminBookRequestDetail = ({ isOpen, onClose, request, onSave }) => {
  const { axios } = useAuth();
  const [status, setStatus] = useState(request ? request.status : '');

  useEffect(() => {
    if (request) {
      setStatus(request.status);
    }
  }, [request]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    const updatedRequest = { ...request, status };
    onSave(updatedRequest);
  };

  return (
    <div className="admin-modal" style={{ display: 'block' }} id='admin-modal'>
      <div className="modal-dialog" id="admin-modal-dialog">
        <div className="modal-content" id='admin-modal-content'>
          <div className="modal-header">
            <h5 className="modal-title" id="admin-modal-title">
              희망도서 신청
            </h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>

          <div className="modal-body">
            {request && request.libraries && request.libraries.length > 0 ? (
              <table className='table' id="admin-modal-table">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>신청도서관</th>
                    <th>신청 권수</th>
                  </tr>
                </thead>
                <tbody>
                  {request.libraries.map((lib, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{lib.lib_name}</td>
                      <td>{lib.count}권</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>해당 도서에 대한 신청 내역이 없습니다.</p>
            )}
            <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={handleSave}>확인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <AdminBookRequestDetail  />
      </Auth>
    </>
  );
}
