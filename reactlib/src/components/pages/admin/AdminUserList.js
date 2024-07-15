import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AdminUserItem from './AdminUserItem';
import AdminHeader from "./AdminHeader";
import AdminSide from "./AdminSide";
import { GlobalStyles } from "./GlobalStyles";
import "./AdminPage.css";
import AdminPagination from "./AdminPagination";
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
    <GlobalStyles width="100vw" />
    <div className="admin-page">


    <div className="admin-base">
      <AdminHeader />
      <AdminSide />
    </div>
    <main className="admin-page-main">
      <div className="admin-page-body">
        <div className="admin-page-title">
            <h1>회원 관리</h1>
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
            <button type="button" class="btn btn-outline-dark" onClick={onSearch}>Search</button>
          </div>



          <table className="admin-table">
            <thead>
              <tr className="admin-th-tr">
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

          <div className="admin-pagination" >
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

export default AdminUserList;
