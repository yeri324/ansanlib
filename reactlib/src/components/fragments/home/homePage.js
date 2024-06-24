import Header from '../header/header';
import Footer from '../footer/footer';
import './homePage.css';
import React from 'react';
import BookSearch from './booksearch';
import CategorySlider from './recommend';
import book1 from '../../images/cover/book1.jpg'
import book2 from '../../images/cover/book2.jpg'
import book3 from '../../images/cover/book3.jpg'
import book4 from '../../images/cover/book4.jpg'


const HomePage = () => {

  const category1 = {
    id: 'category1',
    title: '카테고리 1',
    books: [
      {title : '도서 1', image: book1},
      {title : '도서 2', image: book2},
      {title : '도서 3', image: book3},
      {title : '도서 4', image: book4}
    ]
  };


  return (
    <>
      <Header />
      <section>
        <div className="main_content">
          <div className="content_grid">
            <div className="top_column">
              <div className="book_search">
                <BookSearch />
              </div>
              <div className="notice_board">공지사항</div>
            </div>
            <div className="monthly_plan">캘린더</div>
            <div className="login_box">로그인</div>
          </div>
        </div>
        <div className="sub_content1">
          <div className="trend_list">
            인기 도서
          </div>
        </div>
        <div className="sub_content2">
          <div className="recommend_content">
            <div className="recommend_menu">
              <div className="recommend_list">
                <CategorySlider title={category1.title} books={category1.books} />
              </div>
            </div>
          </div>
          <div className="lib_guide"></div>
        </div>
      </section>
      <Footer />
    </>
  );
}


export default HomePage;