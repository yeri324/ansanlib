import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import center_logo from '../../images/logo/center_logo.png';


const Header = () => {
  const menus = [
    {
      menu: { title: "소개" },
      subs: [
        { title: "연혁", link: "/intro/history" },
        { title: "조직도", link: "/intro/organization" },
        { title: "도서관", link: "/intro/library" }
      ]
    },
    {
      menu: { title: "검색" },
      subs: [
        { title: "통합검색", link: "/book/search" },
        { title: "상세검색", link: "/book/search" },
        { title: "추천도서", link: "/user/recBoard/list" },
        { title: "신간도서", link: "/search/new" }
      ]
    },
    {
      menu: { title: "책읽는 안산" },
      subs: [
        { title: "이달의 도서", link: "/user/recBoard/list" },
        { title: "인기도서", link: "/user/recBoard/list" },
        { title: "추천게시판", link: "/user/recBoard/list" }
      ]
    },
    {
      menu: { title: "게시판" },
      subs: [
        { title: "공지사항", link: "/user/notice/list" },
        { title: "FAQ", link: "/user/faq/list" }
      ]
    },
    {
      menu: { title: "나의 도서관" },
      subs: [
        { title: "나만의 책장", link: "/update" },
        { title: "예약/대출현황", link: "/loanstatus" },
        { title: "정보수정", link: "/update" },
        { title: "희망도서", link: "/requestbook/new" }
      ]
    }
  ];

  return (
    <header>
      <div id="full_header">
        <div id="top_login">
          <a className="enter" href="/login">로그인</a><span> | </span>
          <a className="join" href="/join">회원가입</a>
        </div>
        <div id="header_menu">
          <div id="top_logo">
            <Link to="/">
              <img src={center_logo} alt="Center Logo" />
            </Link>
          </div>
          <div id="top_menu" className="header_links">
            {menus.map((menuItem, index) => (
              <div key={index}>
                <div>{menuItem.menu.title}</div>
                <div className="sub_menu">
                  {menuItem.subs.map((sub, subIndex) => (
                    <div key={subIndex}>
                      <Link to={sub.link}>{sub.title}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
