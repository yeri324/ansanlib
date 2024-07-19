import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './FindId.css'


const FindId = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [foundLoginid, setFoundLoginid] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isFind, setIsFind] = useState(false);



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


    
if(!isFind){
    return (
        <div class='findid'>
            <h2>아이디 찾기</h2>
            <form onSubmit={onFindId} class='findid-form'>
                <div class='findid-name'>
                <label>이름</label>
                    <input type="text" value={name} placeholder='이름을 입력해주세요' onChange={(e) => setName(e.target.value)} />
                </div>
                <div class='findid-email'>
                <label>이메일</label>
                <input type="email" value={email} placeholder='이메일을 입력해주세요' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">아이디 찾기</button>
                <span>&nbsp;&nbsp;</span>
                <div className="link">
                        <NavLink to="/find/pw" >비밀번호 찾기</NavLink>
                        <span>&nbsp;|&nbsp;</span>
                        <NavLink to="/login" >돌아가기</NavLink>
                    </div>
            </form>
            </div>);
        }
        else{
            return(
                <div class="popup">
                    {foundLoginid && <p>찾은 아이디: {foundLoginid}</p>}
                    {errorMessage && <p>{errorMessage}</p>}
                    <NavLink to="/login" >돌아가기</NavLink>
                </div>
            )};
}

export default FindId;