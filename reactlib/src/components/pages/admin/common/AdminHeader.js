import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AdminHeader.css'; // 스타일을 위한 CSS 파일을 임포트합니다.

const AdminHeader = () => {
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    // Logout function
    const handleLogout = () => {
        // Clear session storage (or local storage) depending on where you store the JWT token
        sessionStorage.removeItem('accessToken'); // Remove JWT token from sessionStorage
        localStorage.removeItem('accessToken'); // Just in case, remove from localStorage too

        // Redirect to home page
        navigate('/');
    };

    return (
        <header className="admin-header">
            <div className="header-section-logo">
                {/* <img src={center_logo} alt="Center Logo" /> */}
            </div>

            <div className="header-section-lib">
                <p><a href="/">안산도서관</a></p>
            </div>

            <div className="header-section-main">
                <p></p>
            </div>

            <div className="header-section-side">
                <p>관리자&nbsp; admin &nbsp; 님 &nbsp;| &nbsp;<a href="/login" onClick={handleLogout}>로그아웃</a></p>
            </div>
        </header>
    );
}

export default AdminHeader;
