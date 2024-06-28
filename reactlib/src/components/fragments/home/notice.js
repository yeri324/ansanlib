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
  신간도서: [
    { id: 1, title: '신간도서 1' },
    { id: 2, title: '신간도서 2' },
    { id: 3, title: '신간도서 3' },
    { id: 4, title: '신간도서 4' },
    { id: 5, title: '신간도서 5' },
  ],
  추천도서: [
    { id: 1, title: '추천도서 1' },
    { id: 2, title: '추천도서 2' },
    { id: 3, title: '추천도서 3' },
    { id: 4, title: '추천도서 4' },
    { id: 5, title: '추천도서 5' },
  ],
};

const Notice = () => {
  const [activeCategory, setActiveCategory] = useState('공지사항');

  const categories = ['공지사항', '신간도서', '추천도서'];

  return (
    <div className="notice_board">
      <ul className="notice_tabs">
        {categories.map(category => (
          <li
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      <div className="notice_content">
        <ul>
          {noticePosts[activeCategory].slice(0, 5).map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notice;
