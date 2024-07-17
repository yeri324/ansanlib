// Sidebar.js

import React from "react";
import './SideBar.css';
import { Link } from "react-router-dom";

const Side = () => {
  return (
    <div className="sidebar">
      <h3>사이드 메뉴</h3>
      <ul>
        <li>
          <Link to="/update">회원정보수정</Link>
        </li>
        <li>
          <Link to="/reservation/new">예약</Link>
        </li>
        <li>
          <Link to="/loanstatus">대출</Link>
        </li>
        <li>
          <Link to="/requestbook/new">희망도서 신청</Link>
        </li>
      </ul>
    </div>
  );
};

export default Side;
