import React from 'react';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import FaqList from './components/pages/faq/FaqList';
import FaqForm from './components/pages/faq/FaqForm';
import FaqDetailForm from './components/pages/faq/FaqDetailForm';


import Header from './components/fragments/header/header';

import Admin from './components/pages/admin/Admin';


import LoginForm from './components/pages/user/LoginForm'
import JoinForm from './components/pages/user/JoinForm'
import FindIdForm from './components/pages/user/FindIdForm'
import FindPwForm from './components/pages/user/FindPwForm'


function App() {

  return (
    <div>
      <Routes>
        <Route path="/fragments/header" element={<Header />} />
        <Route path="/faq/list" element={<FaqList />} />
        <Route path="/faq/new" element={<FaqForm />} />
        <Route path="/faq/detail/:id" element={<FaqDetailForm />} />
      
        <Route path="/admin/user/search" element={<Admin />} />
       

        <Route path="/login" element={<LoginForm /> } />
        <Route path="/join" element={<JoinForm /> } />
        <Route path="/findid" element={<FindIdForm /> } />
        <Route path="/findpw" element={<FindPwForm /> } />
           </Routes>


    </div>
  );
}

export default App;