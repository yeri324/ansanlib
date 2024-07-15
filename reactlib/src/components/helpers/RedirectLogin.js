import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth, { LOGIN_STATUS } from '../hooks/useAuth';

/**
 * 로그인이 되어있지 않으면 alert 표출후 로그인 페이지로 Redirect함.
 * @returns {React.JSX.Element}
 */
export default function RedirectLogin() {
    const { loginStatus } = useAuth();

    if(loginStatus === LOGIN_STATUS.LOGGED_OUT) {
        alert("로그인이 필요합니다.");
        return <Navigate to="/login" />;
    } else {
        return null;
    }
};