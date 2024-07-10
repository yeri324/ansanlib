import React from 'react';
import './AdminHeader.css'; // 스타일을 위한 CSS 파일을 임포트합니다.
import center_logo from '../../images/logo/center_logo.png'

const AdminHeader = () => {
    return (
        <header className="admin-header">
            <div className="header-section-logo">
            {/* <img src={center_logo} alt="Center Logo" /> */}
                                
            </div>

            <div className="header-section-lib ">
            <p><a href="/home">안산도서관</a></p>
            </div>

            <div className="header-section-main">
                <p></p>
            </div>

            <div className="header-section-side">
            <p>관리자&nbsp; admin &nbsp; 님 &nbsp;| &nbsp;<a href="/home">로그아웃</a></p>
            </div>
        </header>
    );
}

export default AdminHeader;
