import Header from '../header/header';
import Footer from '../footer/footer';
import './homePage.css';
import React from 'react';
import BookSearch from './booksearch';
import Recommend from './recommend';



const HomePage = () => {

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

        <div className="sub_content">
          <div className="recommend_content">
            <div className="recommend_menu">
              <div className="recommend_list">
                <Recommend />
              </div>
              <div className="recommend_list">
                <Recommend />
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