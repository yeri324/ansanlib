import React from 'react';
import './header.css';
import center_logo from '../../images/logo/center_logo.png';

const Header = () => {
  const menus = [
    {
      menu: { title: "소개" },
      subs: [
        { title: "연혁" },
        { title: "조직도" },
        { title: "도서관" }
      ]
    },
    {
      menu: { title: "검색" },
      subs: [
        { title: "통합검색" },
        { title: "상세검색" },
        { title: "추천도서" },
        { title: "신간도서" }
      ]
    },
    {
      menu: { title: "책읽는 안산" },
      subs: [
        { title: "이달의 도서" },
        { title: "인기도서" },
        { title: "추천게시판" }
      ]
    },
    {
      menu: { title: "게시판" },
      subs: [
        { title: "공지사항" },
        { title: "FAQ" }
      ]
    },
    {
      menu: { title: "나의 도서관" },
      subs: [
        { title: "나만의 책장" },
        { title: "예약/대출현황" },
        { title: "정보수정" },
        { title: "희망도서" }
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
            <img src={center_logo} alt="Center Logo" />
          </div>
          <div id="top_menu">
            {menus.map((menuItem, index) => (
              <div key={index}>
                <div>{menuItem.menu.title}</div>
                <div className="sub_menu">
                  {menuItem.subs.map((sub, subIndex) => (
                    <div key={subIndex}>{sub.title}</div>
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
