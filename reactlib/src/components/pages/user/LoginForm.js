import React, { useState } from 'react';

function LoginForm() {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        // Implement login logic here, e.g., make a POST request to your backend.
    };

    return (
        <div>
            <style>
                {`
                .error {
                    color: #bd2130;
                }
                `}
            </style>

            <form role="form" method="post" action="/users/login" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="loginId">아이디</label>
                    <input 
                        type="text" 
                        name="loginId" 
                        className="form-control" 
                        placeholder="아이디를 입력해주세요" 
                        value={loginId} 
                        onChange={(e) => setLoginId(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="form-control" 
                        placeholder="비밀번호 입력" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {loginErrorMsg && <p className="error">{loginErrorMsg}</p>}

                <div>
                    <button 
                        type="button" 
                        className="btn btn-primary"  
                        id="findid" 
                        onClick={() => window.location.href='/findid'}
                    >
                        아이디 찾기
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        id="findpwd" 
                        onClick={() => window.location.href='/findpw'}
                    >
                        비밀번호 찾기
                    </button>
                </div>

                <button 
                    className="btn btn-primary" 
                    type="submit"
                >
                    로그인
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={() => window.location.href='/join'}
                >
                    회원가입
                </button>
                <input type="hidden" name="_csrf" value="${_csrf.token}" />
            </form>
        </div>
    );
}

export default LoginForm;