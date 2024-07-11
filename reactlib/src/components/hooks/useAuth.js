import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../pages/security/contexts/LoginContextProvider";

//로그인 진행 상태
const LOGIN_STATUS = Object.freeze({
    //로그인 진행중
    LOGIN_PENDING: 0,
    //로그인됨
    LOGGED_IN: 1,
    //로그아웃됨
    LOGGED_OUT: 2,
});

//사용자 권한
const ROLES = Object.freeze({
    //알수없음
    UNKNOWN: 0,
    //일반사용자
    USER: 1,
    //어드민
    ADMIN: 2,
});

//로그인 진행 상태 계산
const login_status_from_context = (isLogin, isLoginInProgress) => {
    if(isLoginInProgress) {
        return LOGIN_STATUS.LOGIN_PENDING;
    } else {
        if(isLogin) {
            return LOGIN_STATUS.LOGGED_IN;
        } else {
            return LOGIN_STATUS.LOGGED_OUT;
        }
    }
};

//사용자 권한
const roles_from_context = (roles) => {
    if(roles?.isUser) {
        return ROLES.USER;
    } else if(roles?.isAdmin) {
        return ROLES.ADMIN;
    } else {
        return ROLES.UNKNOWN;
    }
}

const useAuth = () => {
    const {
        isLogin,
        isLoginInProgress,
        isUserId,
        roles,
        loginCheck: _,
        login,
        logout
    } = useContext(LoginContext);

    return {
        //현재 로그인 상태. LOGIN_STATUS 참고.
        loginStatus: login_status_from_context(isLogin, isLoginInProgress),
        //현재 로그인된 사용자명.
        userId: isUserId,
        //현재 로그인된 사용자의 권한. ROLES 참고.
        roles: roles_from_context(roles),
        //로그인 함수. (username, password)를 매개변수로 받음.
        login,
        //로그아웃 함수.
        logout,
    }
}

export default useAuth;

export {
    LOGIN_STATUS,
    ROLES,
};