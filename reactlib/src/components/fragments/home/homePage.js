import Header from '../header/header';
import Footer from '../footer/footer';
import './homePage.css';
import React from 'react';

const HomePage = () => {

  return (
    <>
      <Header />
      <section>
        <div className="main_content">
          <div className="book_search">
            <nav className="search_navbar">
              <div className="navbar_container">
                <form className="search" role="search">
                  <input className="search_place" type="search" placeholder="검색" aria-label="Search" />
                  <button className="search_btn" type="submit">검색</button>
                </form>
              </div>
            </nav>
          </div>
          <div className="notice_board"></div>
          <div className="monthly_plan"></div>
          <div className="login_box"></div>
        </div>
        <div className="sub_content">
          <div className="recommend_list"></div>
          <div className="lib_guide"></div>
        </div>
      </section>
      <Footer />
    </>
  );
}


export default HomePage;