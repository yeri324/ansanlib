import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../pages/security/contexts/LoginContextProvider";
import authAxios from "../pages/security/apis/api"

/**
 * 현재 로그인 상태
 * @typedef { 0 | 1 | 2 } LoginStatus
 */

/**
 *  현재 로그인 상태
 *  @readonly
 *  @enum { LoginStatus }
 */
const LOGIN_STATUS = Object.freeze({
    /** 로그인 진행중 */
    LOGIN_PENDING: 0,
    /** 로그인됨 */
    LOGGED_IN: 1,
    /** 로그아웃됨 */
    LOGGED_OUT: 2,
});

/**
 * 권한
 * @typedef { 0 | 1 | 2 } Roles
 */

/**
 *  권한
 *  @readonly
 *  @enum { Roles }
 */
const ROLES = Object.freeze({
    /** 알수 없음 */
    UNKNOWN: 0,
    /** 일반사용자 */
    USER: 1,
    /** 어드민 */
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

/**
 * @typedef {Object} UseAuthReturn
 * @property {LoginStatus} loginStatus - 현재 로그인 상태. 로그인이 실패한 경우 아래의 값은 null이 들어옴
 * @property {string | null} userId - 현재 로그인된 사용자명
 * @property {Roles | null} roles - 현재 로그인된 사용자의 권한
 * @property {import("axios").AxiosInstance | null} axios - axios 인스턴스(Authorization 완료됨)
 * @property {((username: string, password: string) => void) | null} login - 로그인 함수. 로그인 되어있지 않은 경우에만 사용가능
 * @property {((ask = true) => void) | null} logout - 로그아웃 함수. 기본적으로는 사용자에게 로그아웃 여부를 물으나, ask = false를 넘길시 묻지 않고 로그아웃 실행. 로그인되어 있는 경우에만 사용가능. 
 */

/**
 *  로그인 기능을 사용하기 위한 hook
 *  @return {UseAuthReturn}
 */
const useAuth = () => {
    const {
        isLogin,
        isLoginInProgress,
        isUserId,
        roles,
        loginCheck: _,
        login,
        logout,
    } = useContext(LoginContext);

    const loginStatus = login_status_from_context(isLogin, isLoginInProgress);

    return {
        loginStatus,
        userId: loginStatus === LOGIN_STATUS.LOGGED_IN ? isUserId : null,
        roles: loginStatus === LOGIN_STATUS.LOGGED_IN ? roles_from_context(roles) : null,
        axios: loginStatus === LOGIN_STATUS.LOGGED_IN ? authAxios : null,
        login: loginStatus === LOGIN_STATUS.LOGGED_OUT ? login : null,
        logout: loginStatus == LOGIN_STATUS.LOGGED_IN ? (ask = true) => logout(!ask) : null,
    };
}

export default useAuth;

export {
    LOGIN_STATUS,
    ROLES,
};