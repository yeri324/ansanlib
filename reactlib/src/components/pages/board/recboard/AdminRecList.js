import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';
import AdminRecCard from './AdminRecCard';
import AdminHeader from '../../admin/common/AdminHeader';
import AdminSide from '../../admin/common/AdminSide';
import './RecList.css';

import AdminPagination from '../../admin/common/AdminPagination';

function AdminRecList() {
  const { axios } = useAuth();
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecCount, setTotalRecCount] = useState(0);
  const recPerPage = 8;

  useEffect(() => {
    onSearch(currentPage);
  }, [currentPage]);

  const onSearch = (page) => {
    axios({
      url: '/recboard/search',
      method: 'post',
      data: {
        page: page - 1,
        size: recPerPage,
      },
      baseURL: 'http://localhost:8090',
    }).then((response) => {
      console.log(response.data);
      setSearchResult(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalRecCount(response.data.totalElements);
    });
  };

  const onCreate = () => {
    navigate('/admin/recboard/form');
  };

  const onDelete = (e) => {
    if (window.confirm('삭제 하시겠습니까?')) {
      axios({
        url: '/admin/recboard/delete',
        method: 'delete',
        data: {
          id: e,
        },
        baseURL: 'http://localhost:8090',
      }).then(() => {
        onSearch(currentPage); // Refresh the list after deletion
      }).catch((error) => {
        console.error('Error deleting record:', error);
      });
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-page">
      <div className="admin-base">
        <AdminHeader />
        <AdminSide />
      </div>
      <main className="admin-page-main">
        <div className="admin-page-body popupPage">
          <div className="admin-page-title">
            <h1>추천 도서 관리</h1>
          </div>
          <div className='all-reclist' >
            <div className='pg-msg'>총 {totalRecCount}건 / {totalPages} 페이지</div>
            <div className='cre-btn'>
              <button className="btn btn-outline-dark" onClick={onCreate}>생성</button>
            </div>
            <div className='rec-list'>
              {searchResult.map((card) => (
                <div className='card' key={card.id}>
                  <AdminRecCard card={card} />
                  <button className="btn btn-outline-dark" onClick={() => onDelete(card.id)}>삭제</button>
                </div>
              ))}
            </div>
            <div className="admin-pagination" >
              <AdminPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <AdminRecList />
      </Auth>
    </>
  );
}
