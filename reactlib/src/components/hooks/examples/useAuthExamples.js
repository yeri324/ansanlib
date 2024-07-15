import { useNavigate } from "react-router-dom";
import useAuth, { LOGIN_STATUS, ROLES } from "../useAuth";
import { useEffect } from "react";

//기본 사용 예시
const UseAuthBasic = () => {
    const {
        loginStatus,
        userId,
        roles,
    } = useAuth();

    let status_message;
    switch(loginStatus) {
        case LOGIN_STATUS.LOGGED_IN:
            status_message = "로그인됨.";
            break;
        case LOGIN_STATUS.LOGGED_OUT:
            status_message = "로그아웃 됨.";
            break;
        case LOGIN_STATUS.LOGIN_PENDING:
            status_message = "로그인 진행중.";
            break;
    }

    let roles_message;
    switch(roles) {
        case ROLES.USER:
            roles_message = "일반 사용자.";
            break;
        case ROLES.ADMIN:
            roles_message = "어드민 사용자.";
            break;
        case ROLES.UNKNOWN:
            roles_message = "알수없음.";
    }

    return (<>
        <div>로그인 상태: {status_message}</div>
        <div>사용자 아이디: {userId}</div>
        <div>권한: {roles_message}</div>
    </>);
};

//로그인 되어있는지 확인 예시
const UseAuthCheckLogin = () => {
    const { loginStatus } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //로그아웃됨.
        if(loginStatus === LOGIN_STATUS.LOGGED_OUT) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }
      }, [loginStatus]); //로그인 상태 변경시 useEffect 실행
};

//어드민인지 확인하는 예시
const UseAuthCheckAdmin = () => {
    const { loginStatus, roles } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //로그아웃됨.
        if(loginStatus === LOGIN_STATUS.LOGGED_OUT) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        } else if(loginStatus === LOGIN_STATUS.LOGGED_IN) {
            //어드민인지 확인
            if(roles !== ROLES.ADMIN) {
                alert("권한이 없습니다.");
                navigate(-1);
            }
        }
      }, [loginStatus]); //로그인 상태 변경시 useEffect 실행
};

export {
    UseAuthBasic,
    UseAuthCheckLogin,
    UseAuthCheckAdmin,
}