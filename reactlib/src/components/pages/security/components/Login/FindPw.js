import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import './FindPw.css';

const FindPw = () => {

    const [loginid, setLoginid] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isFind, setIsFind] = useState(false);

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



    if (!isFind) {
        return (
            <div class='findpw'>
                <h2>비밀번호 찾기</h2>
                <form class='findpw-form' onSubmit={onSendPw}>
                    <div class='findpw-id'>
                        <label>아이디</label>
                        <input type="text" name="username" placeholder='아이디를 입력해주세요' value={loginid} onChange={(e) => setLoginid(e.target.value)} />
                        {/* {errors.username && <span>사용자 아이디를 입력하세요.</span>} */}
                    </div>
                    <div class='findpw-email'>
                        <label>이메일</label>
                        <input type="email" name="email" placeholder='이메일을 입력해주세요' value={email} onChange={(e) => setEmail(e.target.value)} />
                        {/* {errors.email && <span>이메일을 입력하세요.</span>} */}
                    </div>
                    <button type="submit">비밀번호 찾기</button>
                    <span>&nbsp;&nbsp;</span>
                    <div className="link">
                        <NavLink to="/find/id" >아이디 찾기</NavLink>
                        <span>&nbsp;|&nbsp;</span>
                        <NavLink to="/login" >돌아가기</NavLink>
                    </div>
                </form>

            </div>
        );
    } else {
        return (
            <div class="popup">
                {errorMessage && <p>{errorMessage}</p>}
                <NavLink to="/login" >돌아가기</NavLink>
            </div>);
    }
}

export default FindPw;