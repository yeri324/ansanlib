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

        axios({
            url: '/api/user/login',
            method: 'post',
            data: {
                loginid: loginForm.loginid,
                password: loginForm.password,
            },
            baseURL: 'http://localhost:8090',
            withCredentials: true
        })
        .then(response => {
            console.log(response.data);
            alert("로그인 되었습니다.");
            window.location.href = '/home';
            onLogin({
                loginid: loginForm.loginid,
                name: response.data.name // 서버에서 반환하는 사용자 정보에 따라 변경
            });
            setError(''); // 오류 메시지 초기화
       
        })
        .catch(error => {
            console.error('로그인 오류:', error);
            setError("로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.");
        });
    };
    return (
        <div className="loginForm">
            <div className="title"></div>
            <div className="line"></div>
            <div id="instructions">안산도서관 AnsanLibrary</div>
            <div className='loginCenter'>
                <div className='inputlogin'>
                    <h3>로그인</h3>
                    <div className='input_login'>
                        <div className='input_id'>
                            <label>아이디
                                <input
                                    type="text"
                                    value={loginForm.loginid}
                                    onChange={(e) => setLoginForm(prevState => ({
                                        ...prevState,
                                        loginid: e.target.value
                                    }))}
                                />
                            </label>
                        </div>
                        <div className='input_pw'>
                            <label>비밀번호
                                <input
                                    type="password"
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm(prevState => ({
                                        ...prevState,
                                        password: e.target.value
                                    }))}
                                />
                            </label>
                        </div>
                    </div>
                    <button id="login_btn" onClick={handleLogin}>로그인</button>
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
