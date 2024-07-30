
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// 메인
import Header from './components/fragments/header/header';
import Footer from './components/fragments/footer/footer';
import HomePage from './components/fragments/home/homePage';
import keywordCloud_bookId from './components/fragments/home/KeywordCloud_bookId';
import History from './components/fragments/home/History';
import Organ from './components/fragments/home/Organ';
import LibInfo from './components/fragments/home/LibInfo';
// 도서검색
import SearchPage from './components/pages/book/searchBookList/searchPage';
import BookDetailPage from './components/pages/book/bookDetail/bookDetailPage';
import ApiBookSearch from './components/pages/book/bookApi/ApiSearchPage';
//게시판
import BoardList from './components/pages/board/page/BoardList';
import BoardDetail from './components/pages/board/page/BoardDetail';
import BoardForm from './components/pages/board/page/BoardForm';
import UserRecList from './components/pages/board/recboard/UserRecList';
import AdminRecList from './components/pages/board/recboard/AdminRecList';
import AdminRecForm from './components/pages/board/recboard/AdminRecForm';
import NewbookList from './components/pages/board/newBook/NewbookList';
//관리자
import Admin from './components/pages/admin/common/Admin';
import AdminBookList from './components/pages/admin/page/AdminBookList';
import AdminUserList from './components/pages/admin/page/AdminUserList';
import AdminUserDetail from './components/pages/admin/page/AdminUserDetail';
import HolidayDetail from './components/pages/admin/modal/HolidayDetail';
import Holiday from './components/pages/admin/page/Holiday';
import HolidayList from './components/pages/admin/page/HolidayList';
import HolidayNew from './components/pages/admin/modal/HolidayNew';
import AddBook from './components/pages/admin/page/AddBook';
import AdminPopPage from './components/pages/admin/page/AdminPopPage';
import AdminBookRequest from './components/pages/admin/page/AdminBookRequest';
//마이페이지
import MyPage from './components/pages/myPage/MyPage';
import LoanStatusList from './components/pages/loanStatus/LoanStatusList';
import UpdateUserForm from './components/pages/myPage/UpdateUserForm';
//예약
import ReservationForm from './components/pages/reservation/ReservationForm';
import ReservationList from './components/pages/reservation/ReservationList';
//희망도서
import RequestBookForm from './components/pages/requestBook/RequestBookForm';
import RequestBookList from './components/pages/requestBook/RequestBookList';
//관심도서
import BookInterest from './components/pages/book/bookInterest/BookInterest';
//계정/보안
import Login from './components/pages/security/pages/Login';
import Find from './components/pages/security/pages/Find';
import Join from './components/pages/security/pages/Join';
import User from './components/pages/security/pages/User';
import { UseAuthBasic, UseAuthCheckAdmin, UseAuthCheckLogin } from './components/hooks/examples/useAuthExamples';
import LibMap from './components/fragments/home/LibMap';

function App() {
        
        
        return (
                <div>
                        <Routes>
                                {/* 메인 */}
                                <Route path="/" element={<HomePage />} />
                                <Route path="/fragments/header" element={<Header />} />
                                <Route path="/fragments/footer" element={<Footer />} />
                                {/* <Route path="/fragments/home" element={<keywordCloud_bookId />} /> */}
                                <Route path="/intro/history" element={<History />} />
                                <Route path="/intro/organization" element={<Organ />} />
                                <Route path="/intro/library" element={<LibInfo />} />

                                {/* 게시판 */}
                                <Route path="/:roles/:board/list" element={<BoardList />} />
                                <Route path="/admin/:board/form" element={<BoardForm />} />
                                <Route path="/:roles/:board/detail/:id" element={<BoardDetail />} />
                                <Route path="/admin/recboard/list" element={<AdminRecList />} />
                                <Route path="/admin/recboard/form" element={<AdminRecForm />} />
                                <Route path="/user/recboard/list" element={<UserRecList />} />
                                <Route path="/newBook" element={<NewbookList />} />

                                {/* 관리자 */}
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/admin/user/search" element={<AdminUserList />} />
                                <Route path="/admin/user/detail/:id" element={<AdminUserDetail />} />
                                <Route path="/admin/holiday/new" element={<HolidayNew />} />
                                <Route path="/admin/holiday" element={<Holiday />} />
                                <Route path="/admin/holiday/list" element={<HolidayList />} />
                                <Route path="/admin/holiday/detail" element={<HolidayDetail />} />
                                <Route path="/admin/book/new" element={<AddBook />} />
                                <Route path="/admin/book/request" element={<AdminBookRequest />} />
                                <Route path="/admin/book/list" element={<AdminBookList />} />
                                <Route path="/admin/popup" element={<AdminPopPage />} />

                                {/* 회원정보 */}
                                <Route path="/mypage" element={<MyPage />} />
                                <Route path="/update" element={<UpdateUserForm />} />
                                <Route path="/loanstatus" element={<LoanStatusList />} />
                                <Route path="/book/interest/list" element={<BookInterest />} />

                                {/* 검색 */}
                                <Route path="/book/search" element={<SearchPage />} />
                                <Route path="/book/detail/:id" element={<BookDetailPage />} />
                                <Route path="/bookapi/search" element={<ApiBookSearch />} />

                                {/* 희망도서 */}
                                <Route path="/requestbook/new" element={<RequestBookForm />} />
                                <Route path="/requestbook/list" element={<RequestBookList />} />

                                {/* 예약 */}
                                <Route path="/reservation/new" element={<ReservationForm />} />
                                <Route path="/reservation/list" element={<ReservationList />} />

                                {/* 계정/보안 관련 */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/find/:id" element={<Find />} />
                                <Route path="/join" element={<Join />} />
                                <Route path="/user" element={<User />} />

                                <Route path='/map' element={<LibMap />} />

                                {/* useAuth 훅 테스트 페이지 */}
                                <Route path="/examples/useauth/basic" element={<UseAuthBasic />} />
                                <Route path="/examples/useauth/check_login" element={<UseAuthCheckLogin />} />
                                <Route path="/examples/useauth/check_admin" element={<UseAuthCheckAdmin />} />
                        </Routes>
                </div>
        );
}

export default App;


