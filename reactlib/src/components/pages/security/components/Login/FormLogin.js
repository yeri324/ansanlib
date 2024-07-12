import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContextProvider";

const FormLogin = ()=>{
    const {login} = useContext(LoginContext)
    const navigate = useNavigate();

    const onLogin=(e)=>{
        e.preventDefault()

        const form= e.target
        const loginid = form.loginid.value
        const password = form.password.value
        login(loginid,password);
    }

    const onFindId = () => {
        navigate('/findId');
    }

    const onFindPw = () => {
        navigate('/findPw');
    }

    return (
        <div>
            <h2>로그인 폼</h2>
            <form onSubmit={(e)=>onLogin(e)}>
            <div>
                <label htmlFor="loginid">아이디</label>
                <input type="text" id="loginid" placeholder="loginid" name="loginid" autoComplete="loginid" required />
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" placeholder="password" name="password" autoComplete="password" required />
            </div>
            <button type="button" onClick={onFindId}>아이디 찾기</button>
            <button type="button" onClick={onFindPw}>비밀번호 찾기</button>
            <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default FormLogin;