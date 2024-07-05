import React, { useState, useEffect, useLocation } from 'react';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FaqList from './components/pages/faq/FaqList';
import FaqForm from './components/pages/faq/FaqForm';
import FaqDetailForm from './components/pages/faq/FaqDetailForm';
import Header from './components/fragments/header/header';
import Footer from './components/fragments/footer/footer';
import HomePage from './components/fragments/home/homePage';
import AdminUserList from './components/pages/admin/AdminUserList';
import AdminUserDetail from './components/pages/admin/AdminUserDetail';
import LoginForm from './components/pages/user/LoginForm';
import JoinForm from './components/pages/user/JoinForm';
import FindIdForm from './components/pages/user/FindIdForm';
import FindPwForm from './components/pages/user/FindPwForm';
import AdminFaqList from './components/pages/admin/AdminFaqList';
import ReservationForm from './components/pages/reservation/ReservationForm';
import Admin from './components/pages/admin/Admin';
import AuthenticationForm from './components/pages/userAuthentication/AuthenticationForm';
import MyPage from './components/pages/myPage/MyPage';
import ReservationList from './components/pages/reservation/ReservationList';
import RequestBookForm from './components/pages/requestBook/RequestBookForm';
import RequestBookList from './components/pages/requestBook/RequestBookList';


import SearchPage from './components/pages/book/searchBookList/searchPage';
import BookDetailPage from './components/pages/book/bookDetail/bookDetailPage';
import LoanStatusList from './components/pages/loanStatus/LoanStatusList';
import UpdateUserForm from './components/pages/myPage/UpdateUserForm';
import DeleteUserForm from './components/pages/myPage/DeleteUserForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("member");
    if (storedUser) {
      const { userId, loginTime } = JSON.parse(storedUser);
      const currentTime = new Date().getTime();
      const sessionTime = 1800000; // 30분 후 자동 로그아웃
      if (currentTime - loginTime < sessionTime) {
        setIsLoggedIn(true);
        setUserId(userId);
      } else {
        handleLogout();
      }
    } else {
      setIsLoggedIn(false);
      setUserId("");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("member");
    setIsLoggedIn(false);
    setUserId("");
    window.location.href = "/";
  };

  const handleLogin = (loginForm) => {
    const loginTime = new Date().getTime();
    sessionStorage.setItem("member", JSON.stringify({ ...loginForm, loginTime }));
    setIsLoggedIn(true);
    setUserId(loginForm.userId);
    window.location.href = "/home";
  };

  const Layout = ({ children }) => {
    const location = useLocation();
    const isManagePath = location.pathname.startsWith('/admin');

    return (
      <>
        {!isManagePath && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} userId={userId} />}
        <main>{children}</main>
        {!isManagePath && <Footer />}
      </>
    );
  };

  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />} />
        <Route path="/fragments/header" element={<Header />} />
        <Route path="/fragments/footer" element={<Footer />} />

        <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
        <Route path="/join" element={<JoinForm />} />
        <Route path="/findid" element={<FindIdForm />} />
        <Route path="/findpw" element={<FindPwForm />} />


        <Route path="/faq/list" element={<FaqList />} />
        <Route path="/faq/new" element={<FaqForm />} />
        <Route path="/faq/detail/:id" element={<FaqDetailForm />} />

        <Route path="/reservation/new" element={<ReservationForm />} />
        <Route path="/reservation/list" element={<ReservationList />} />
        <Route path="/admin/user/search" element={<Admin />} />
        <Route path="/user/authentication" element={<AuthenticationForm />} />
        
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/update" element={<UpdateUserForm/>} />
        <Route path="/delete" element={<DeleteUserForm/>} />
        
        <Route path="/admin/user/search" element={<AdminUserList />} />
        <Route path="/admin/user/detail/:id" element={<AdminUserDetail />} />
        <Route path="/admin/faqlist" element={<AdminFaqList />} />

        <Route path="/book/search" element={<SearchPage />} />
        <Route path="/book/detail/:id" element={<BookDetailPage />} />

        <Route path="/requestbook/new" element={<RequestBookForm/>} />
        <Route path="/requestbook/list" element={<RequestBookList/>} />
        
        <Route path="/loanstatus" element={<LoanStatusList/>} />

      </Routes>

    </div>
  );
}

export default App;



