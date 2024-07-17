import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../fragments/header/header";
import Footer from "../../fragments/footer/footer";
import Sidebar from "./Sidebar"; // Sidebar 컴포넌트 추가
import UpdateUserForm from "./UpdateUserForm"; // 회원정보수정 컴포넌트
import ReservationForm from "../reservation/ReservationForm"; // 예약 컴포넌트
import LoanStatusList from "../loanStatus/LoanStatusList"; // 대출 컴포넌트
import RequestBookForm from "../requestBook/RequestBookForm"; // 희망도서 신청 컴포넌트

const MyPage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="main-content">
          <div className="sidebar">
            {/* Sidebar 컴포넌트 추가 */}
            <Sidebar />
          </div>
          {/* Switch 대신 Routes를 사용하여 각 Route 설정 */}
          <Routes>
            <Route path="/update" element={<UpdateUserForm />} />
            <Route path="/reservation/new" element={<ReservationForm />} />
            <Route path="/loanstatus" element={<LoanStatusList />} />
            <Route path="/requestbook/new" element={<RequestBookForm />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyPage;
