import axios from 'axios';
import { useState } from 'react';
//import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {
    const [loginForm, setLoginForm] = useState({
        loginid: "",
        password: "",
    });

    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('/api/user/login', loginForm)
            .then(response => {
                if (response.status === 200) {
                    alert("로그인되었습니다.")
                    onLogin({
                        loginid: loginForm.loginid,
                        name: response.data.name
                    });
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    console.log(loginForm);
                    setError("로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.");
                } else {
                    setError('로그인 중 오류가 발생했습니다.');
                }
            });
    };

return (
    <div className="loginForm">
        <div className="title">로그인</div>
        <div className="line"></div>
        <div id="instructions">안산도서관 AnsanLibrary</div>
        <div className='loginCenter'>
            <div className='inputlogin'>
                <h3>로그인</h3>
                <div className='input_login'>
                    <div className='input_id'>
                        <label>아이디</label>
                            <input
                                type="text"
                                value={loginForm.loginid}
                                onChange={(e) => setLoginForm({
                                    ...loginForm,
                                    loginid: e.target.value
                                })}
                            />
                    </div>
                    <div className='input_pw'>
                        <label>비밀번호</label>
                            <input
                                type="password"
                                value={loginForm.password}
                                onChange={(e) => setLoginForm({
                                    ...loginForm,
                                    password: e.target.value
                                })}
                            />
                    </div>
                </div>
                <button id="login_btn" type="submit" onClick={handleLogin}>로그인</button>
                {error && <div className='error'>{error}</div>}
            </div>
            <div className='extra_btn'>
                <button type="button" className='findId_btn' onClick={() => window.location.href = '/findid'}>아이디 찾기</button>
                <button type="button" className='findPw_btn' onClick={() => window.location.href = '/findpw'}>비밀번호 찾기</button>
                <button type="button" className='join_btn' onClick={() => window.location.href = '/join'}>회원 가입</button>
            </div>
        </div>
    </div>
);
}

export default LoginForm;
