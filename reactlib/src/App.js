import React, { useState, useEffect, useLocation } from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminFaqList from './components/pages/board/faq/AdminFaqList';
import AdminFaqForm from './components/pages/board/faq/AdminFaqForm';
import AdminFaqDetailForm from './components/pages/board/faq/AdminFaqDetailForm';
import AdminNoticeDetailForm from './components/pages/board/notice/AdminNoticeDetailForm';
import AdminNoticeList from './components/pages/board/notice/AdminNoticeList';
import AdminNoticeForm from './components/pages/board/notice/AdminNoticeForm';
import UserFaqList from './components/pages/board/faq/UserFaqList';
import UserFaqDetailForm from './components/pages/board/faq/UserFaqDetailForm';
import UserNoticeList from './components/pages/board/notice/UserNoticeList';
import UserNoticeDetailForm from './components/pages/board/notice/UserNoticeDetailForm';
import Header from './components/fragments/header/header';
import Footer from './components/fragments/footer/footer';
import HomePage from './components/fragments/home/homePage';
import AdminUserList from './components/pages/admin/AdminUserList';
import AdminUserDetail from './components/pages/admin/AdminUserDetail';
import ReservationForm from './components/pages/reservation/ReservationForm';
import Admin from './components/pages/admin/Admin';
import MyPage from './components/pages/myPage/MyPage';
import ReservationList from './components/pages/reservation/ReservationList';
import RequestBookForm from './components/pages/requestBook/RequestBookForm';
import RequestBookList from './components/pages/requestBook/RequestBookList';
import HolidayDetail from './components/pages/admin/HolidayDetail';
import SearchPage from './components/pages/book/searchBookList/searchPage';
import BookDetailPage from './components/pages/book/bookDetail/bookDetailPage';
import LoanStatusList from './components/pages/loanStatus/LoanStatusList';
import UpdateUserForm from './components/pages/myPage/UpdateUserForm';
import DeleteUserForm from './components/pages/myPage/DeleteUserForm';
import Login from './components/pages/security/pages/Login';
import FindId from './components/pages/security/components/Login/FindId';
import FindPw from './components/pages/security/components/Login/FindPw';
import Join from './components/pages/security/pages/Join';
import About from './components/pages/security/pages/About';
import Home from './components/pages/security/pages/Home';
import User from './components/pages/security/pages/User';
import Holiday from './components/pages/admin/Holiday';
import HolidayList from './components/pages/admin/HolidayList';
import HolidayNew from './components/pages/admin/HolidayNew';
import AddBook from './components/pages/admin/AddBook';

import AdminBookRequest from './components/pages/admin/AdminBookRequest';


function App() {



        return (

                <div>

                        <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/fragments/header" element={<Header />} />
                                <Route path="/fragments/footer" element={<Footer />} />

                                <Route path="/admin/faq/list" element={<AdminFaqList />} />
                                <Route path="/admin/faq/new" element={<AdminFaqForm />} />
                                <Route path="/admin/faq/detail/:id" element={<AdminFaqDetailForm />} />
                                <Route path="/admin/notice/list" element={<AdminNoticeList />} />
                                <Route path="/admin/notice/new" element={<AdminNoticeForm />} />
                                <Route path="/admin/notice/detail/:id" element={<AdminNoticeDetailForm />} />
                                <Route path="/user/notice/list" element={<UserNoticeList />} />
                                <Route path="/user/notice/detail/:id" element={<UserNoticeDetailForm />} />
                                <Route path="/user/faq/list" element={<UserFaqList />} />
                                <Route path="/user/faq/detail/:id" element={<UserFaqDetailForm />} />

                                <Route path="/admin" element={<Admin />} />
                                <Route path="/admin/user/search" element={<AdminUserList />} />
                                <Route path="/admin/user/detail/:id" element={<AdminUserDetail />} />
                                <Route path="/admin/holiday/new" element={<HolidayNew />} />
                                <Route path="/admin/holiday" element={<Holiday />} />
                                <Route path="/admin/holiday/list" element={<HolidayList />} />
                                <Route path="/admin/holiday/detail" element={<HolidayDetail />} />
                                <Route path="/admin/book/new" element={<AddBook />} />
                                <Route path="/admin/book/request" element={<AdminBookRequest />} />

                                <Route path="/book/search" element={<SearchPage />} />
                                <Route path="/book/detail/:id" element={<BookDetailPage />} />

                                <Route path="/requestbook/new" element={<RequestBookForm />} />
                                <Route path="/requestbook/list" element={<RequestBookList />} />

                                <Route path="/reservation/new" element={<ReservationForm />} />
                                <Route path="/reservation/list" element={<ReservationList />} />

                                <Route path="/mypage" element={<MyPage />} />
                                <Route path="/update" element={<UpdateUserForm />} />
                                <Route path="/delete" element={<DeleteUserForm />} />


                                <Route path="/loanstatus" element={<LoanStatusList />} />


                                {/* 시큐리티테스트용 페이지 */}
                                <Route path="/home" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/findId" element={<FindId />} />
                                <Route path="/findPw" element={<FindPw />} />
                                <Route path="/join" element={<Join />} />
                                <Route path="/user" element={<User />} />
                                <Route path="/about" element={<About />} />


                        </Routes>
                </div>
        );
}

export default App;


