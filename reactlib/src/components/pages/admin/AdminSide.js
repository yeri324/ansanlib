import React, { useState } from 'react';
import './AdminSide.css'; // 스타일을 위한 CSS 파일을 임포트합니다.

const AdminSide = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
 
    <div className="sidebar">
          <div style={{paddingBottom:"10px"}}> <ul><a href="/admin" className="no-underline">홈페이지</a></ul></div> 
      <ul>

        <li><a href="/admin/user/search" className="no-underline">회원관리</a></li>
        <li className="has-submenu">
          <a href="#" className="no-underline" onClick={() => toggleMenu('board')}>게시판관리</a>
          <ul className={`submenu ${openMenu === 'board' ? 'open' : ''}`}>
            <li><a href="/admin/faqlist" className="no-underline">FAQ</a></li>
            <li><a href="#" className="no-underline">공지사항</a></li>
      
          </ul>
        </li>
        <li className="has-submenu">
          <a href="#" className="no-underline" onClick={() => toggleMenu('schedule')}>일정 관리</a>
          <ul className={`submenu ${openMenu === 'schedule' ? 'open' : ''}`}>
            <li><a href="/admin/holiday" className="no-underline">캘린더</a></li>
            <li><a href="/admin/holiday/list" className="no-underline">휴관일</a></li>
          </ul>
        </li>
      
        <li className="has-submenu">
          <a href="#" className="no-underline" onClick={() => toggleMenu('book')}>도서관리</a>
          <ul className={`submenu ${openMenu === 'book' ? 'open' : ''}`}>
            <li><a href="/admin/book/new" className="no-underline">도서 등록</a></li>
            <li><a href="/admin/book/list" className="no-underline">도서 목록</a></li>
            <li><a href="/admin/book/request" className="no-underline">희망도서 목록</a></li>
          
          </ul>
        </li>
        <li><a href="#" className="no-underline">통계관리</a></li>
      </ul>
    </div>
  );
}

export default AdminSide;
