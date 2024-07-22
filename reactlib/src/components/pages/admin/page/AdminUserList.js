import "./AdminPage.css";
import AdminUserItem from '../item/AdminUserItem';
import AdminHeader from "../common/AdminHeader";
import AdminSide from "../common/AdminSide";
import AdminPagination from "../common/AdminPagination";

import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AdminUserList = () => {
  const { axios } = useAuth();
  const navigate = useNavigate();

  const [searchOption, setSearchOption] = useState({
    searchBy: "userId",
    searchQuery: "",
    selectRadio: "all",
  });

  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setSearchOption((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSearch = () => {
    axios.post(`/admin/user/search`, {
      searchBy: searchOption.searchBy,
      searchQuery: searchOption.searchQuery,
      selectRadio: searchOption.selectRadio,
    }).then((response) => {
      setSearchResult(response.data);
    }).catch(err => {
      console.error("Error fetching search results:", err.response ? err.response.data : err.message);
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Data:', err.response.data);
        console.error('Headers:', err.response.headers);
      } else if (err.request) {
        console.error('Request:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
    });
  };

  useEffect(() => {
    onSearch();
  }, []);

  const handleDetail = (user) => {
    navigate(`/admin/user/detail/${user.userId}`, { state: { ...user } });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <div className="admin-page">
        <div className="admin-base">
          <AdminHeader />
          <AdminSide />
        </div>
        <main className="admin-page-main">
          <div className="admin-page-body">
            <div className="admin-page-title">
              <h2>회원 조회</h2>
            </div>
            <div className="admin-page-search">
              <select name="searchBy" value={searchOption.searchBy} onChange={handleOnChange}>
                <option value="userId">ID</option>
                <option value="userName">이름</option>
              </select>
              <input type="text" name="searchQuery" value={searchOption.searchQuery} onChange={handleOnChange} />
              <input type="radio" id="all" name="selectRadio" value="all" checked={searchOption.selectRadio === "all"} onChange={handleOnChange} />
              <label htmlFor="all">all</label>
              <input type="radio" id="penalty" name="selectRadio" value="penalty" checked={searchOption.selectRadio === "penalty"} onChange={handleOnChange} />
              <label htmlFor="penalty">penalty</label>
              <input type="radio" id="latefee" name="selectRadio" value="latefee" checked={searchOption.selectRadio === "latefee"} onChange={handleOnChange} />
              <label htmlFor="latefee">latefee</label>
              <button type="button" className="btn btn-outline-dark" onClick={onSearch}>Search</button>
            </div>
            <table className="admin-table">
              <thead>
                <tr className="admin-th-tr">
                  <th style={{ width: '5%' }}>no</th>
                  <th style={{ width: '10%' }}>아이디</th>
                  <th style={{ width: '10%' }}>이름</th>
                  <th style={{ width: '10%' }}>번호</th>
                  <th style={{ width: '20%' }}>주소</th>
                  <th style={{ width: '15%' }}>상세주소</th>
                  <th style={{ width: '10%' }}>패널티</th>
                  <th style={{ width: '10%' }}>연체료</th>
                  <th style={{ width: '5%' }}>문자</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(user => (
                  <AdminUserItem key={user.userId} user={user} handleDetail={handleDetail} />
                ))}
              </tbody>
            </table>
            <div className="admin-pagination">
              <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <AdminUserList />
      </Auth>
    </>
  );
}
