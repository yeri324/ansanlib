import React from "react";
import AdminHeader from "./AdminHeader";
import AdminSide from "./AdminSide";
import './Admin.css'; // 스타일을 위한 CSS 파일을 임포트합니다.
import { GlobalStyles } from "./GlobalStyles";
const Admin = () => {
    return (
        <>
        <GlobalStyles width="100vw" />


        <div className="amdin-main">
        <div className="admin-base">
        <AdminHeader />
        <AdminSide />
        </div>
        <main className="admin-main-main">
            <div className="admin-body">
        <p>메인콘텐추~</p>
        </div>
        </main>
        </div>
        </>
    );
}

export default Admin;
