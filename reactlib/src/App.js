import React, { useState, useEffect, useLocation } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/fragments/header/header';
import Footer from './components/fragments/footer/footer';
import HomePage from './components/fragments/home/homePage';

import ReservationForm from './components/pages/reservation/ReservationForm';
import MyPage from './components/pages/myPage/MyPage';
import ReservationList from './components/pages/reservation/ReservationList';
import RequestBookForm from './components/pages/requestBook/RequestBookForm';
import RequestBookList from './components/pages/requestBook/RequestBookList';
import SearchPage from './components/pages/book/searchBookList/searchPage';
import BookDetailPage from './components/pages/book/bookDetail/bookDetailPage';
import LoanStatusList from './components/pages/loanStatus/LoanStatusList';
import UpdateUserForm from './components/pages/myPage/UpdateUserForm';
import DeleteUserForm from './components/pages/myPage/DeleteUserForm';

import Login from './components/pages/security/pages/Login';
import Join from './components/pages/security/pages/Join';
import About from './components/pages/security/pages/About';
import Home from './components/pages/security/pages/Home';
import User from './components/pages/security/pages/User';


import Admin from './components/pages/admin/common/Admin';
import AdminFaqList from './components/pages/board/faq/AdminFaqList';
import AdminFaqForm from './components/pages/board/faq/AdminFaqForm';
import AddBook from './components/pages/admin/page/AddBook';
import AdminBookList from './components/pages/admin/page/AdminBookList';
import AdminUserList from './components/pages/admin/page/AdminUserList';
import AdminUserDetail from './components/pages/admin/page/AdminUserDetail';
import AdminBookRequest from './components/pages/admin/page/AdminBookRequest';
import HolidayDetail from './components/pages/admin/modal/HolidayDetail';
import Holiday from './components/pages/admin/page/Holiday';
import HolidayList from './components/pages/admin/page/HolidayList';
import HolidayNew from './components/pages/admin/modal/HolidayNew';

import { UseAuthBasic, UseAuthCheckAdmin, UseAuthCheckLogin } from './components/hooks/examples/useAuthExamples';
import BoardList from './components/pages/board/page/BoardList';
import BoardDetail from './components/pages/board/page/BoardDetail';
import BoardForm from './components/pages/board/page/BoardForm';

import AdminPopPage from './components/pages/admin/AdminPopPage';



function App() {



        return (

                <div>

                        <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/fragments/header" element={<Header />} />
                                <Route path="/fragments/footer" element={<Footer />} />

                                <Route path="/:roles/:board/list" element={<BoardList />} />
                                <Route path="/admin/:board/form" element={<BoardForm />} />
                                <Route path="/:roles/:board/detail/:id" element={<BoardDetail />} />

                                <Route path="/admin" element={<Admin />} />
                                <Route path="/admin/user/search" element={<AdminUserList />} />
                                <Route path="/admin/user/detail/:id" element={<AdminUserDetail />} />
                                <Route path="/admin/holiday/new" element={<HolidayNew />} />
                                <Route path="/admin/holiday" element={<Holiday />} />
                                <Route path="/admin/holiday/list" element={<HolidayList />} />
                                <Route path="/admin/holiday/detail" element={<HolidayDetail />} />
                                <Route path="/admin/book/new" element={<AddBook />} />
                                <Route path="/admin/book/request" element={<AdminBookRequest />} />
                                <Route path="/admin/faq/list" element={<AdminFaqList />} />

                                <Route path="/admin/faq/new" element={<AdminFaqForm />} />
                                <Route path="/admin/book/list" element={<AdminBookList />} />
                 

                                <Route path="/admin/popup" element={<AdminPopPage />} />


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
                                <Route path="/join" element={<Join />} />
                                <Route path="/user" element={<User />} />
                                <Route path="/about" element={<About />} />


                                {/* useAuth 훅 테스트 페이지 */}
                                <Route path="/examples/useauth/basic" element={<UseAuthBasic />} />
                                <Route path="/examples/useauth/check_login" element={<UseAuthCheckLogin />} />
                                <Route path="/examples/useauth/check_admin" element={<UseAuthCheckAdmin />} />
                        </Routes>
                </div>
        );
}

export default App;


