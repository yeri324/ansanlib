import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import './notice.css';
import axios from 'axios';

const Notice = () => {
  const navigate = useNavigate();
  const [searchFaq, setSearchFaq] = useState([]);
  const [searchNotice, setSearchNotice] = useState([]);
  const [searchRec, setSearchRec] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchAll, setSearchAll] = useState({ searchNotice, searchFaq, searchRec });
  const boardPerPage = 5;

  const [activeCategory, setActiveCategory] = useState('공지사항');
  const categories = ['공지사항', 'FAQ', '추천도서'];
  const cate2 = ['notice', 'faq', 'recboard'];

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
          } else if (item === 'faq') {
            setSearchFaq(response.data.content);
          } else {
            setSearchRec(response.data.content);
          }
        });
    })
  };

  // 카테고리변경
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // 게시판 바로이동(+)
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
                onClick={() => handleCategoryClick(category)}>
                {category}
              </li>
            ))}
          </ul>
          <button className="plus_button" onClick={handlePlusButtonClick}>+</button>
        </div>
        <div className="notice_content">
          <ul>
            {activeCategory === '공지사항'? searchNotice.map((item) => (
              <li key={item.id} onClick={() => navigate(`/user/notice/detail/${item.id}`)}>{item.title}</li>
            )): activeCategory === 'FAQ'? searchFaq.map((item) => (
              <li key={item.id} onClick={() => navigate(`/user/faq/detail/${item.id}`)}>{item.title}</li>
            )): searchRec.map((item) => (
              <li key={item.id} onClick={() => navigate(`/book/detail/${item.book.id}`)}>{item.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notice;
