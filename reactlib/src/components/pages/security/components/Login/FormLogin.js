import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";
import './FormLogin.css';

const FormLogin = () => {
    const { login } = useContext(LoginContext)

    const onLogin = (e) => {
        e.preventDefault()

        const form = e.target
        const loginid = form.loginid.value
        const password = form.password.value
        login(loginid, password);
    }

    return (
        <div class='login'>
            <h2>로그인</h2>
            <form onSubmit={(e) => onLogin(e)} class='login-form'>
                <div>
                    <label htmlFor="loginid">아이디</label>
                    <input type="text" id="loginid" placeholder="아이디를 입력해주세요" name="loginid" autoComplete="loginid" required />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" id="password" placeholder="비밀번호를 입력해주세요" name="password" autoComplete="password" required />
                </div>
                <button type="submit">Login</button>
                <span>&nbsp;&nbsp;</span>
                <div className="link">
                    <NavLink to="/find/id" >아이디 찾기</NavLink>
                    <span>&nbsp;|&nbsp;</span>
                    <NavLink to="/find/pw">비밀번호 찾기</NavLink>
                    <span>&nbsp;|&nbsp;</span>
                    <NavLink to="/join">회원가입</NavLink>
                </div>
            </form>
        </div>
    )
}

export default FormLogin;