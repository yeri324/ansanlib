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
        { title: "통합검색", link: "/search/integrated" },
        { title: "상세검색", link: "/search/advanced" },
        { title: "추천도서", link: "/search/recommended" },
        { title: "신간도서", link: "/search/new" }
      ]
    },
    {
      menu: { title: "책읽는 안산" },
      subs: [
        { title: "이달의 도서", link: "/reading/monthly" },
        { title: "인기도서", link: "/reading/popular" },
        { title: "추천게시판", link: "/reading/recommendations" }
      ]
    },
    {
      menu: { title: "게시판" },
      subs: [
        { title: "공지사항", link: "/board/announcements" },
        { title: "FAQ", link: "/board/faq" }
      ]
    },
    {
      menu: { title: "나의 도서관" },
      subs: [
        { title: "나만의 책장", link: "/mylibrary/bookshelf" },
        { title: "예약/대출현황", link: "/mylibrary/status" },
        { title: "정보수정", link: "/mylibrary/edit" },
        { title: "희망도서", link: "/mylibrary/wishlist" }
      ]
    }
  ];

  return (
    <header>
      <div id="full_header">
        <div id="top_login">
          <a className="enter">로그인</a><span> | </span>
          <a className="join">회원가입</a>
        </div>
        <div id="header_menu">
          <div id="top_logo">
            <Link to="/home">
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
