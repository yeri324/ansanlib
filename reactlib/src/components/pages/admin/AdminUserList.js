import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AdminUserItem from './AdminUserItem';
import AdminHeader from "./AdminHeader";
import AdminSide from "./AdminSide";
import "./Table.css";

const AdminUserList = () => {
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
    axios.post('/admin/user/search', {
      searchBy: searchOption.searchBy,
      searchQuery: searchOption.searchQuery,
      selectRadio: searchOption.selectRadio,
    }).then((response) => {
      setSearchResult(response.data);
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
      <AdminHeader />
      <div className="main-container">
        <AdminSide />
        <div className="admin-content">
          <h1>회원 관리</h1>

          <div className="search-container" style={{ textAlign: "center" }}>
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
            <button type="button" class="btn btn-outline-dark" onClick={onSearch}>Search</button>
          </div>

          <div>
          <table className='adminTable' style={{ width: '1000px' }}>
              <thead>
                <tr className="admintr">
                  <th style={{ width: '10%' }}>no</th>
                  <th style={{ width: '20%' }}>아이디</th>
                  <th style={{ width: '20%' }}>이름</th>
                  <th style={{ width: '20%' }}>패널티</th>
                  <th style={{ width: '20%' }}>연체료</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(user => (
                  <AdminUserItem key={user.userId} user={user} handleDetail={handleDetail} />
                ))}
              </tbody>
            </table>

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button type="button" class="btn btn-outline-dark" className="page-link" onClick={() => paginate(currentPage - 1)}>&laquo;</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i + 1} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                    <button type="button" class="btn btn-outline-dark" className="page-link" onClick={() => paginate(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button type="button" class="btn btn-outline-dark"  className="page-link" onClick={() => paginate(currentPage + 1)}>&raquo;</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserList;
