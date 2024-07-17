import React from "react";
import AdminHeader from "./AdminHeader";
import AdminSide from "./AdminSide";
import './Admin.css'; // 스타일을 위한 CSS 파일을 임포트합니다.
import useAuth, { LOGIN_STATUS, ROLES } from '../../hooks/useAuth';
import Auth from '../../helpers/Auth';
import RedirectLogin from '../../helpers/RedirectLogin';


const Admin = () => {
    const { axios } = useAuth();
    return (
       
    <div className="admin-page">


    <div className="admin-base">
      <AdminHeader />
      <AdminSide />
    </div>
        <main className="admin-main-main">
            <div className="admin-main-body">
        <p>메인콘텐추~</p>
        </div>
        </main>
        </div>
       
    );
}

export default function () {
    return (
      <>
        <RedirectLogin />
        <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <Admin />
        </Auth>
    </>
  );
}