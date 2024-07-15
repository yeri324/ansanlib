import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FindPw.css';

const FindPw = () => {

    const [loginid, setLoginid] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isFind, setIsFind] = useState(false);
    const navigate = useNavigate();

    // 임시 비밀번호 발급
    const onSendPw = async (e) => {
        e.preventDefault();
        try {
            await axios({
                url: '/users/findPw',
                method: 'post',
                data: {
                    loginid: loginid,
                    email: email,
                },
                baseURL: 'http://localhost:8090',
            }
            ).then((response) => {
                console.log(response.data);
                setIsFind(true);
                setShowPopup(true);
                setErrorMessage('이메일이 정상적으로 발송되었습니다.');
            })
        } catch (error) {
            setErrorMessage('일치하는 사용자가 없습니다.');
            setShowPopup(true);  // 예외 처리 로직 추가
        }
    };

    //로그인페이지로 돌아가기
    const onLogin = () => {
        navigate('/login');
    }

    if (!isFind) {
        return (
            <div class='findpw'>
                <form class='findpw-form' onSubmit={onSendPw}>
                    <div class='findpw-id'>
                        <label>사용자 아이디</label>
                        <input type="text" name="username" value={loginid} onChange={(e) => setLoginid(e.target.value)}/>
                        {/* {errors.username && <span>사용자 아이디를 입력하세요.</span>} */}
                    </div>
                    <div class='findpw-email'>
                        <label>이메일</label>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        {/* {errors.email && <span>이메일을 입력하세요.</span>} */}
                    </div>
                    <button type="submit">임시 비밀번호 발급 요청</button>
                </form>
            </div>
        );
    } else {
        return (
            <div class="findpw-popup">
                {errorMessage && <p>{errorMessage}</p>}
                <button type='button' onClick={onLogin}>닫기</button>
            </div>);
    }
}

export default FindPw;