import React, { useState } from 'react';
import './notice.css';

const noticePosts = {
  공지사항: [
    { id: 1, title: '공지사항 1' },
    { id: 2, title: '공지사항 2' },
    { id: 3, title: '공지사항 3' },
    { id: 4, title: '공지사항 4' },
    { id: 5, title: '공지사항 5' },
  ],
  FAQ: [
    { id: 1, title: 'FAQ 1' },
    { id: 2, title: 'FAQ 2' },
    { id: 3, title: 'FAQ 3' },
    { id: 4, title: 'FAQ 4' },
    { id: 5, title: 'FAQ 5' },
  ],
  추천도서: [
    { id: 1, title: '추천도서 1' },
    { id: 2, title: '추천도서 2' },
    { id: 3, title: '추천도서 3' },
    { id: 4, title: '추천도서 4' },
    { id: 5, title: '추천도서 5' }
  ]
};


const Notice = () => {
  const [activeCategory, setActiveCategory] = useState('공지사항');

  const categories = ['공지사항', 'FAQ', '추천도서'];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handlePlusButtonClick = () => {
    const pageMapping = {
      공지사항: '/user/notice/list',
      FAQ: '/user/faq/list',
      추천도서: '/user/recboard/list'
    };
    window.location.href = pageMapping[activeCategory];
  };

  return (
    <div className="notice_full">
      <div className="notice_board">
        <div className="notice_tabs_wrapper">
          <ul className="notice_tabs">
            {categories.map(category => (
              <li
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          <button className="plus_button" onClick={handlePlusButtonClick}>+</button>
        </div>
        <div className="notice_content">
          <ul>
            {noticePosts[activeCategory].slice(0, 5).map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notice;
