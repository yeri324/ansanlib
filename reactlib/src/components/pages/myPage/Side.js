import React, { useState } from "react";
import './SideBar.css';
import { Link } from "react-router-dom";

const Side = () => {
  const [showReservationSubmenu, setShowReservationSubmenu] = useState(false);

  const toggleReservationSubmenu = () => {
    setShowReservationSubmenu(!showReservationSubmenu);
  };



  return (
    <div className="my-sidebar">
      <h3>사이드 메뉴</h3>
      <ul>
        <li>
          <Link to="/update">회원정보수정</Link>
        </li>

        <li>
          <Link to="/reservation/list">예약 현황</Link>
        </li>
       
        <li>
          <Link to="/loanstatus">대출 현황</Link>
        </li>
        <li>
        <Link to="/requestbook/list">희망도서 목록</Link>
        </li>
       
        <li>
          <Link to="/book/interest/list">관심도서</Link>
        </li>
      </ul>
    </div>
  );
};

export default Side;
