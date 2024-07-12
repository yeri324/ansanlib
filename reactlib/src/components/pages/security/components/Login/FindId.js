import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FindId.css'


const FindId = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [foundLoginid, setFoundLoginid] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isFind, setIsFind] = useState(false);
    const navigate = useNavigate();


    //아이디 찾기 + 결과 맞춰서 팝업 여부
    const onFindId = async (e) => {
        e.preventDefault();
        try {
            await axios({
                url: '/users/findId',
                method: 'post',
                data: {
                    name: name,
                    email: email,
                },
                baseURL: 'http://localhost:8090',
            }
            ).then((response) => {
                setFoundLoginid(response.data);
                console.log(response.data);
                setIsFind(true);
                setShowPopup(true);
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

    
if(!isFind){
    return (
        <div class='findid'>
            <h2>아이디 찾기</h2>
            <form onSubmit={onFindId} class='findid-form'>
                <label class='findid-id'>
                    이름:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label class='findid-email'>
                    이메일:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <button type='button' onClick={onLogin}>돌아가기</button>
                <button type="submit">아이디 찾기</button>
            </form>
            </div>);
        }
        else{
            return(
                <div class="popup">
                    {foundLoginid && <p>찾은 아이디: {foundLoginid}</p>}
                    {errorMessage && <p>{errorMessage}</p>}
                    <button type='button' onClick={onLogin}>닫기</button>
                </div>
            )};
}

export default FindId;