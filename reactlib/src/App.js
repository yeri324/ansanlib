import React from 'react';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import FaqList from './components/pages/faq/FaqList';
import FaqForm from './components/pages/faq/FaqForm';
import FaqDetailForm from './components/pages/faq/FaqDetailForm';

import Header from './components/fragments/header/header';
import Footer from './components/fragments/footer/footer';
import HomePage from './components/fragments/home/homePage';

import Admin from './components/pages/admin/Admin';
import AdminUserList from './components/pages/admin/AdminUserList';
import AdminUserDetail from './components/pages/admin/AdminUserDetail';

import LoginForm from './components/pages/user/LoginForm';
import JoinForm from './components/pages/user/JoinForm';
import FindIdForm from './components/pages/user/FindIdForm';
import FindPwForm from './components/pages/user/FindPwForm';



/*메인홈페이지에서 이동) 로그인 "/login",  횐가입 "/join" */



function App() {

  return (
    <div>
      <Routes>
        <Route path="/fragments/header" element={<Header />} />
        <Route path="/fragments/footer" element={<Footer />} />
        <Route path="/home" element={<HomePage />} />
        
        <Route path="/faq/list" element={<FaqList />} />
        <Route path="/faq/new" element={<FaqForm />} />
        <Route path="/faq/detail/:id" element={<FaqDetailForm />} />

        <Route path="/admin/user/search" element={<Admin />} />

        <Route path="/admin/user/search" element={<AdminUserList />} />
        <Route path="/admin/user/detail/:id" element={<AdminUserDetail />} />
        
       <Route path="/login" element={<LoginForm />} />
       <Route path="/join" element={<JoinForm />} />
       <Route path="/findid" element={<FindIdForm />} />
       <Route path="/findpw" element={<FindPwForm />} />


        
      </Routes>


    </div>
  );
}

export default App;



