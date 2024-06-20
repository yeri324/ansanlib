import React from 'react';
import './header.css';


const Header = () => {

  const menu = [
    {
      menu1: { title: "소개" },
      subs: [
        { title: "연혁" },
        { title: "조직도" },
        { title: "도서관" }
      ]
    }
  ];

  return (
    <div class="header_menu">
      {menu.map((menuItem, index) => (
        <div key={index}>
          {menuItem.menu1.title}
          <div className="sub_menu">
            {menuItem.subs.map((sub, subIndex) => (
              <div key={subIndex}>{sub.title}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};


export default Header;