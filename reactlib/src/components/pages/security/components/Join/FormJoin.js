import React, { useContext,useRef } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider';
import LoginContextConsumer from '../../contexts/LoginContextConsumer';

const FormJoin = ({ join , check }) => {
    const { login } = useContext(LoginContext);
    const idRef = useRef(null);

    //회원가입 메소드로 데이터 전송
    const onJoin = (e) => {
        e.preventDefault();
        const loginid = e.target.loginid.value;
        const password = e.target.password.value;
        const password2 = e.target.password2.value;
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const address = e.target.address.value;
        const address2 = e.target.address2.value;
        const gender = e.target.gender.value;
        const sms = e.target.sms.value;
        

        console.log(loginid, password,password2, name,phone, email,address,address2,gender,sms);

        join({loginid, password,password2, name,phone, email,address,address2,gender,sms});
    };
    
    const onCheckId = ()=>{
        const rName = idRef.current.name;
        const rValue = idRef.current.value;
        const  rData = {[rName]: rValue}
        console.log(rData);
        
        check(rData);
    };

    return (
        <div className="form">
            <h2 className="login-title">Join</h2>

            <form className="login-form" onSubmit={(e) => onJoin(e)}>
                <div>
                    <label htmlFor="name">이름</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="이름을 입력해주세요!"
                        name="name"
                        autoComplete="name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="loginid">사용자ID</label>
                    <input
                        id="loginid"
                        type="text"
                        placeholder="아이디를 입력해주세요!"
                        name="loginid"
                        autoComplete="loginid"
                        required
                        ref={idRef}
                    />
                    <button type='button' onClick={onCheckId}>아이디체크</button>
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요!"
                        name="password"
                        autoComplete="current-password"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password2">비밀번호확인</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="작성한 비밀번호를 입력해주세요!"
                        name="password2"
                        autoComplete="current-password2"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="text">핸드폰 번호</label>
                    <input
                        id="phone"
                        type="text"
                        placeholder="핸드폰번호를 입력해주세요!"
                        name="phone"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email을 입력해주세요!"
                        name="email"
                        autoComplete="email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">주소</label>
                    <input
                        id="address"
                        type="address"
                        placeholder="주소를 입력해주세요!"
                        name="address"
                        autoComplete="address"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address2">상세주소</label>
                    <input
                        id="address2"
                        type="address2"
                        placeholder="상세주소를 입력해주세요!"
                        name="address2"
                        autoComplete="address2"
                        required
                    />
                </div>
                <div>
                    <label >성별</label>
                    <input type="radio" name="gender" id="male" value="male"  checked="checked"/>
                    <label htmlFor="male">남성</label>
                    <input type="radio" name="gender" id="female" value="female"  />
                    <label htmlFor="female">여성</label>
                </div>
                <div>
                    <label htmlFor="address">SMS수신동의</label>
                    <input type="radio" name="sms" id="sms_yes" value="yes"  checked="checked"/>
                    <label htmlFor="male">동의</label>
                    <input type="radio" name="sms" id="sms_no" value="no"  />
                    <label htmlFor="female">비동의</label>
                </div>
                <button className="btn btn--form btn-login" type="submit">
                    Join
                </button>
            </form>
            <LoginContextConsumer />
        </div>
    );
};

export default FormJoin;
