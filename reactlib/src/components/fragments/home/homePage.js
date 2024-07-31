import React, { useEffect, useState, useRef } from 'react';
import './homePage.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import BookSlider from './BookSlider';
import Notice from './notice';
import TodoCalendar from './calendar';
import "react-calendar/dist/Calendar.css";
import LibMap from './LibMap';
import Popup from './popup';
import LibInfoSelect from './LibInfoSelect';
import LibInfoData from './LibInfoData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const data = LibInfoData();
  const [category, setCategory] = useState(Object.keys(data)[0]);
  const [firstOption, setFirstOption] = useState(Object.keys(data[category])[0]);
  const [secondOption, setSecondOption] = useState(Object.keys(data[category][firstOption])[0]);
  const [selectedItem, setSelectedItem] = useState(data[category][firstOption][secondOption]);
  const [popList, setPopList] = useState([])
  const [recList, setRecList] = useState([])
  const [newBookList, setNewBookList] = useState([])
  const navigate = useNavigate()
  const inputSearch = useRef("");


  useEffect(() => {
    getPopList()
    getnewbookList()
    getRecList()
  }, [])

  const getPopList = () => {
    axios({
      url: `/api/popup/home`,
      method: 'get',
      baseURL: 'http://localhost:8090',
    }
    ).then((res) => {
      setPopList(res.data);
    })
  }

  const getRecList = () => {
    axios(
      {
        url: '/recboard/search',
        method: 'post',
        data: {
          page: 0,
          size: 8,
        },
        baseURL: 'http://localhost:8090',
      }
    ).then((response) => {
      const resList = response.data.content.map(item => item.book)
      setRecList(resList)
    });
  }

  const getnewbookList = () => {
    axios(
      {
        url: '/newBook',
        method: 'post',
        data: {
          page: 0,
          size: 8,
        },
        baseURL: 'http://localhost:8090',
      }
    ).then((response) => {
      setNewBookList(response.data.content)

    });

  }

  const onSearch = (inputSearch) => {
    navigate(`/book/search`, {
      state: {
          query : inputSearch,
      }
    })
  }

  return (
    <>
      <header><Header /></header>
      <div id="home-popup">
        {popList.map((popup) => (<Popup key={popup.id} popup={popup} />))}

      </div>
      <div id="home-main-content" >
        <div className="search-div" >
          <div className='search-input-group'>
            <input ref={inputSearch} className='search-input' />
            <button onClick={()=>onSearch(inputSearch.current.value)} className='search-btn'>검색</button>
          </div>
        </div>
        <div className='quick-menu'>
          <div className='quick-content' onClick={() => window.location.reload(navigate('/intro/history'))}>
            <h5>도서관소개</h5>
          </div>
          <div className='quick-content' onClick={() => window.location.reload(navigate('/newBook'))}>
            <h5>신규도서</h5>
          </div>
          <div className='quick-content' onClick={() => window.location.reload(navigate('/user/recboard/list'))}>
            <h5>추천도서</h5>
          </div>
          <div className='quick-content' onClick={() => window.location.reload(navigate('/requestbook/new'))}>
            <h5>희망도서신청</h5>
          </div>
        </div>
        <div className="bottom-column">
          <div className="notice-board">
            <Notice />
          </div>
          <div className="monthly-plan">
            <div className='calendar-title'><h4>도서관 휴관일</h4></div>
            <TodoCalendar
            />
          </div>
        </div>

        <div className="book-content-group">
          <div className="book-content">
            <h2>추천도서</h2>
            <hr />
            <div className="bookslider-list">
              <BookSlider bookList={recList} />
            </div>
          </div>
          <div className="book-content">
            <h2>신규도서</h2>
            <hr />
            <div className="bookslider-list">
              <BookSlider bookList={newBookList} />
            </div>
          </div>
        </div>
        <div className="lib-info-container">
          <div className="lib-info">
            <h2>오시는 길</h2>
            <hr />
            <div className="lib-map">
              <div className='libmap-img'>
                <LibMap latitude={selectedItem.latitude} longitude={selectedItem.longitude} />
              </div>
              <div className='libmap-info'>
                <div className='libmap-select'>
                  <LibInfoSelect
                    category={category}
                    firstOption={firstOption}
                    secondOption={secondOption}
                    setCategory={setCategory}
                    setFirstOption={setFirstOption}
                    setSecondOption={setSecondOption}
                    setSelectedItem={setSelectedItem}
                  />
                  <div className='libmap-data'>
                    <h3>{selectedItem.name}</h3> <a href={selectedItem.homepage} target="_blank" >도서관이동 ▷</a>
                    <p><span>휴무일</span>  {selectedItem.holyday}</p>
                    <p><span>주소</span> {selectedItem.address}</p>
                    <p><span>전화</span> {selectedItem.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer><Footer /></footer>
    </>
  );
}

export default HomePage;
