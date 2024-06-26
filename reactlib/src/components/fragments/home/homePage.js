import Header from '../header/header';
import Footer from '../footer/footer';
import './homePage.css';
import React from 'react';
import BookSearch from './booksearch';
import CategorySlider from './recommend';
import Trends from './Trends';
import Notice from './notice';
import book1 from '../../images/cover/book1.jpg'
import book2 from '../../images/cover/book2.jpg'
import book3 from '../../images/cover/book3.jpg'
import book4 from '../../images/cover/book4.jpg'
import Calendar from './calendar';


const HomePage = () => {

  const category1 = {
    id: 'category1',
    title: '카테고리 1',
    books: [
      { title: '도서 1', image: book1 },
      { title: '도서 2', image: book2 },
      { title: '도서 3', image: book3 },
      { title: '도서 4', image: book4 }
    ]
  };


  return (
    <>
      <Header />
      <section>
        <div className="main_content">
          <div className="main_grid">
            <div className="content_grid">
              <div className="top_column">
                <div className="book_search">
                  <BookSearch />
                </div>
                <Notice />
              </div>
              <div className="monthly_plan">
                <Calendar />
              </div>
              <div className="login_box">로그인</div>
            </div>
          </div>

          <div className="sub_content1">
            <div className="trend_list">
              <Trends />
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
        </div>
      </section>

      <Footer />
    </>
  );
}


export default HomePage;