import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notice = () => {
  const navigate = useNavigate();
  const [searchFaq, setSearchFaq] = useState([]);
  const [searchNotice, setSearchNotice] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const boardPerPage = 5;

  const [activeCategory, setActiveCategory] = useState('공지사항');
  const categories = ['공지사항', 'FAQ',];
  const cate2 = ['notice', 'faq'];

  //리스트 읽기
  useEffect(() => {
    onSearch(currentPage);
  }, [currentPage]);

  // 검색 리스트
  const onSearch = async (page) => {
    cate2.map((item) => {
      axios(
        {
          url: `/${item}/search`,
          method: 'post',
          data: {
            page: page - 1,
            size: boardPerPage,
          },
          baseURL: 'http://localhost:8090',
        }).then((response) => {
          if (item === 'notice') {
            setSearchNotice(response.data.content);
          } else {
            setSearchFaq(response.data.content);
          }
        });
    })
  };

  // 카테고리변경
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

 

  return (
      <div className="notice_board">
        <div className="notice_tabs_wrapper">
          <ul className="notice_tabs">
            {categories.map(category => (
              <li
                key={category}
                className={activeCategory === category ? 'active' : ''}
                onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="notice_content">
          <ul>
            {activeCategory === '공지사항'? searchNotice.map((item) => (
              <li key={item.id}><p onClick={() => navigate(`/user/notice/detail/${item.id}`)}>{item.title}</p></li>
            )):searchFaq.map((item) => (
              <li key={item.id}><p onClick={() => navigate(`/user/faq/detail/${item.id}`)}>{item.title}</p></li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default Notice;
