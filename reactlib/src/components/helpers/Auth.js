import LoginStatus from "../hooks/useAuth";
import useAuth from "../hooks/useAuth";

/** @typedef {import("../hooks/useAuth").LoginStatus} LoginStatus */
/** @typedef {import("../hooks/useAuth").Roles} Roles */

/**
 * 현재 로그인 상태에 맞는 Conditional rendering 제공. loginStatus가 일치할 경우 children을 랜더링하고 일치하지 않으면 아무것도 랜더링하지 않음.
 * @param {Object} props 
 * @param {React.ComponentType<any>} props.children - 자식 컴포넌트
 * @param {LoginStatus | [LoginStatus]} props.loginStatus - 현재 로그인 상태가 loginStatus와 일치하거나 배열에 포함되어 있을 경우 해당 컴포넌트를 랜더링
 * @param {Roles | [Roles] | null} props.roles - 현재 사용자의 권한이 Roles와 일치하거나 배열에 포함되어 있을 경우만 렌더링. null이면 무시됨
 * @param {React.ComponentType<any> | null} props.fallback - 위의 조건이 하나라도 안맞을때 보여줄 컴포넌트. 
 * 
 * @returns {React.JSX.Element}
 */
export default function Auth(props) {
    const {
        children,
        loginStatus,
        roles,
        fallback,
    } = props;

    const { loginStatus: currentLoginStatus, roles: currentRoles} = useAuth();

    const loginStatusArray = Array.isArray(loginStatus) ? loginStatus : [loginStatus];
    const rolesArray = !roles ? [] : (Array.isArray(roles) ? roles : [roles]);

    const loginStatusMatches = loginStatusArray.indexOf(currentLoginStatus) !== -1;
    const rolesMatches = rolesArray.length === 0 || (rolesArray.length > 0 && rolesArray.indexOf(currentRoles) != -1);

    if(loginStatusMatches && rolesMatches) {
        return <>{children}</>;
    } else {
        return fallback;
    }
};