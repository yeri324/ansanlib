import React from 'react';
import './AdminHeader.css'; // 스타일을 위한 CSS 파일을 임포트합니다.

const AdminHeader = () => {
    return (
        <header className="admin-header">
            <div className="header-section-logo">
                <p><a href="/home">로고/사이트</a></p>
            </div>
            <div className="header-section ">
                
            </div>
            <div className="header-section-main">
                <p><a href='/admin'>안산도서관</a></p>
            </div>
            <div className="header-section-side">
            <p>관리자&nbsp; admin &nbsp; 님 &nbsp;| &nbsp;<a href="/home">로그아웃</a></p>
            </div>
        </header>
    );
}

export default AdminHeader;
