import React from "react";
import AdminHeader from "./AdminHeader";
import AdminSide from "./AdminSide";
import './Admin.css'; // 스타일을 위한 CSS 파일을 임포트합니다.

const Admin = () => {
    return (
        <div>
            <AdminHeader />
            
                <AdminSide />
                <div className="admin-main-container">
                <div className="admin-content">
                    <h1>메인 콘텐츠</h1>
                    <p>여기에 메인 콘텐츠가 표시됩니다.</p>
                </div>
            </div>
        </div>
    );
}

export default Admin;
