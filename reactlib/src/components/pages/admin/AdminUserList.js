import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AdminUserItem from './AdminUserItem';

const AdminUserList = () => {
  const navigate = useNavigate();

  const [searchOption, setSearchOption] = useState({
    searchBy: "id",
    searchQuery: "",
    selectRadio: "all",
  });

  const [searchResult, setSerchResult] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setSearchOption((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    });

  };

  const onSearch = () => {
    console.log(searchOption.searchBy, searchOption.searchQuery, searchOption.selectRadio)
    axios(
      {
        url: '/admin/user/search',
        method: 'post',
        data: {
          searchBy: searchOption.searchBy,
          searchQuery: searchOption.searchQuery,
          selectRadio: searchOption.selectRadio,
        },
        baseURL: 'http://localhost:8090',
      }
    ).then((response) => {
      setSerchResult(response.data);
    });
  }

  useEffect(() => {
    onSearch();
  }, [])
  


  // 상세페이지 이동
  
  const handleDetail = ({ user }) => {
    navigate(`/admin/user/detail/${user.userId}`, {
      state : {
        ...user
      }
    });
  };


  return (
    <div className="userList">
      <div>

        <select name="searchBy" value={searchOption.searchBy} onChange={handleOnChange}>
          <option value="userId">ID</option>
          <option value="userName">Name</option>
        </select>

        <input type="text" name="searchQuery" value={searchOption.searchQuery} onChange={handleOnChange} />

        <input type="radio" name="selectRadio" value="all" checked={searchOption.selectRadio === "all"} onChange={handleOnChange} />
        <input type="radio" name="selectRadio" value="penalty" checked={searchOption.selectRadio === "penalty"} onChange={handleOnChange} />
        <input type="radio" name="selectRadio" value="latefee" checked={searchOption.selectRadio === "latefee"} onChange={handleOnChange} />


        <button onClick={onSearch}>Search</button>
      </div>



      <div>
        <h2>결과</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Penalty</th>
              <th>Late Fee</th>
            </tr>
          </thead>
          
         <tbody>
            {searchResult.map((user) => (
              // <AdminUserItem key={user.userId} {...user}/>
              <tr>
                <td>{user.userId}</td>
                <td onClick={() => handleDetail({ user })}>{user.loginid}</td>
                <td>{user.name}</td>
                <td>{user.penalty}</td>
                <td>{user.lateFee}</td>
              </tr>
            ))}


          </tbody> 
        </table>
      </div>
    </div>
  );
}
export default AdminUserList;