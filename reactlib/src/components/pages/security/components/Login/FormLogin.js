import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider";

const FormLogin = ()=>{
    const {login} = useContext(LoginContext)

    const onLogin=(e)=>{
        e.preventDefault()

        const form= e.target
        const loginid = form.loginid.value
        const password = form.password.value
        login(loginid,password);
    }

    return (
        <div>
            <h2>로그인 폼</h2>
            <form onSubmit={(e)=>onLogin(e)}>
            <div>
                <label htmlFor="loginid">loginid</label>
                <input type="text" id="loginid" placeholder="loginid" name="loginid" autoComplete="loginid" required />
            </div>
            <div>
                <label htmlFor="password">loginid</label>
                <input type="password" id="password" placeholder="password" name="password" autoComplete="password" required />
            </div>
            <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default FormLogin;