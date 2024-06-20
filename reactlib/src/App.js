import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import FaqList from './components/pages/faq/FaqList';
import FaqForm from './components/pages/faq/FaqForm';
import FaqDetailForm from './components/pages/faq/FaqDetailForm';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/faq/list" element={<FaqList />} />
        <Route path="/faq/new" element={<FaqForm />} />
        <Route path="/faq/detail/:id" element={<FaqDetailForm />} />

        {/* <Route path="/login" element={<LoginForm isLoggedIn={isLoggedIn} setIsLoggedIn={(value) => setIsLoggedIn(value)} />} />
        <Route path="/signup" element={<SignUpSelect isLoggedIn={isLoggedIn} />} />
        <Route path="/signup/normal" element={<SignUp isLoggedIn={isLoggedIn} isComp={false} />} />
        <Route path="/signup/company" element={<SignUp isLoggedIn={isLoggedIn} isComp={true} />} />
        <Route path="/logout" element={<LoginForm />} />


        <Route path="/find-id" element={<FindId />} />
        <Route path="/find-pwd" element={<FindPwd />} />
        <Route path="/businessUpgrade" element={<BusinessUpgrade memberId={memberId} memberState={memberState} />} /> */}
      </Routes>


    </div>
  );
}

export default App;