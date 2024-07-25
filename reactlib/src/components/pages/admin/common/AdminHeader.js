import React from 'react';
import white_logo from "../../../images/logo/white_logo.png";
//     <img src={center_logo} alt="Center Logo" />  
import { Link } from 'react-router-dom';
import './AdminHeader.css'; // 스타일을 위한 CSS 파일을 임포트합니다.
import { useContext } from "react";
import { LoginContext } from '../../../pages/security/contexts/LoginContextProvider';
import useAuth, { LOGIN_STATUS, ROLES } from "../../../../components/hooks/useAuth";
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const { logout } = useContext(LoginContext);
    const { loginStatus, loginId, roles } = useAuth();
    const navigate = useNavigate();
    return (
        <header className="admin-header">
        

            <div className="admin-header-section-logo"  >
                <img src={white_logo}  onClick={() => navigate('/')} /> &nbsp;
            <a href="/" >안산시 도서관  </a>
     
            </div>

            <div className="admin-header-section-main">
                <p></p>
            </div>

            <div className="admin-header-section-side">
                {loginStatus === LOGIN_STATUS.LOGGED_IN ? (
                    <p>
                        관리자&nbsp; {loginId} &nbsp; 님 &nbsp;| &nbsp;
                        <button type="button" onClick={() => logout()}>로그아웃</button>
                    </p>
                ) : (
                    <p>
                        <Link to="/login">로그인</Link>
                    </p>
                )}
            </div>
        </header>
    );
}

export default AdminHeader;
