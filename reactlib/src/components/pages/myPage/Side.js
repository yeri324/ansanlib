import React, { useState } from "react";
import './SideBar.css';
import { Link } from "react-router-dom";

const Side = () => {
  const [showReservationSubmenu, setShowReservationSubmenu] = useState(false);
  const [showRequestBookSubmenu, setShowRequestBookSubmenu] = useState(false);

  const toggleReservationSubmenu = () => {
    setShowReservationSubmenu(!showReservationSubmenu);
  };

  const toggleRequestBookSubmenu = () => {
    setShowRequestBookSubmenu(!showRequestBookSubmenu);
  };

  return (
    <div className="my-sidebar">
      <h3>사이드 메뉴</h3>
      <ul>
        <li>
          <Link to="/update">회원정보수정</Link>
        </li>
        <li onClick={toggleReservationSubmenu} className="has-submenu">
          예약
          <span className="arrow">{showReservationSubmenu ? " ▲" : " ▼"}</span>
          {showReservationSubmenu && (
            <ul className="submenu">
              <li>
                <Link to="/reservation/new">예약하기</Link>
              </li>
              <li>
                <Link to="/reservation/list">예약 현황</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/loanstatus">대출</Link>
        </li>
        <li onClick={toggleRequestBookSubmenu} className="has-submenu">
          희망도서 신청
          <span className="arrow">{showRequestBookSubmenu ? " ▲" : " ▼"}</span>
          {showRequestBookSubmenu && (
            <ul className="submenu">
              <li>
                <Link to="/requestbook/new">희망도서 신청</Link>
              </li>
              <li>
                <Link to="/requestbook/list">희망도서 목록</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Side;
