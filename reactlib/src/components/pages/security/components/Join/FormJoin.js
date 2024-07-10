import React, { useState,useContext,useRef } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider';
import LoginContextConsumer from '../../contexts/LoginContextConsumer';
import { getData } from '../../apis/auth';

const FormJoin = ({ join,}) => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        loginid: '',
        password: '',
        password2: '',
        name: '',
        phone: '',
        email: '',
        address: '',
        address2: '',
        gender: 'male',
        sms: 'yes',
    });
    const [inputDisable, setInputDisable] = useState({
        isloginid : false,
        isEmail : false,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const fPhone = formatPhone(value);
            setFormData({ ...formData, phone: fPhone });
        }

        else{
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    };

    //회원가입 메소드로 데이터 전송
    const onJoin = (e) => {
        e.preventDefault();
            join(formData);
    };

    //아이디 중복 체크
    const onCheckId = async ()=>{
        if(formData.loginid==null ||formData.loginid==""){
            alert("아이디를 입력해주세요.");
            return;
        }
        const data = {loginid: formData.loginid}
        try {
            await getData(data).then((response)=>{ 
              if( response.status == 200 ) { 
              console.log(`사용 가능한 아이디!`);
              alert("사용 가능한 아이디입니다.");
              setInputDisable({ ...inputDisable, isloginid: true })
            }})
             
          } catch (error) {
            if(error.response.status == 409 ){ 
              console.log(`사용중인 아이디!`);
              alert("사용 할 수 없는 아이디입니다.")
            }
            else {
              console.log(`오류!`);
              alert("조회 중 오류가 발생하였습니다.")
            }
          }
    };


    //이메일 중복 체크
    const onCheckEmail = async ()=>{
        if(formData.email==null ||formData.email==""){
            alert("이메일을 입력해주세요.");
            return;
        }
        const data = {email: formData.email}      
        try {
            await getData(data).then((response)=>{ 
              if( response.status == 200 ) { 
              console.log(`사용 가능한 이메일!`);
              alert("사용 가능한 이메일입니다.");
              setInputDisable({ ...inputDisable, isEmail: true })
            }})
             
          } catch (error) {
            if(error.response.status == 409 ){ 
              console.log(`사용중인 이메일!`);
              alert("사용 할 수 없는 이메일입니다.")
            }
            else {
              console.log(`오류!`);
              alert("조회 중 오류가 발생하였습니다.")
            }
          }
    };

    //핸드폰 번호 포매팅
    const formatPhone = (str) => {
        str = str.replace(/[^0-9]/g, '');
        let tmp = '';
        if (str.length < 4) {
            return str;
        } else if (str.length < 7) {
            tmp += str.substr(0, 3) + '-';
            tmp += str.substr(3);
            return tmp;
        } else if (str.length < 11) {
            tmp += str.substr(0, 3) + '-';
            tmp += str.substr(3, 3) + '-';
            tmp += str.substr(6);
            return tmp;
        } else {
            tmp += str.substr(0, 3) + '-';
            tmp += str.substr(3, 4) + '-';
            tmp += str.substr(7);
            return tmp;
        }
    };

   
    return (
        <div className="form">
            <h2 className="login-title">Join</h2>

            <form className="login-form" onSubmit={(e) => onJoin(e)}>
                <div>
                    <label htmlFor="loginid">사용자ID</label>
                    <input
                        id="loginid"
                        type="text"
                        placeholder="아이디를 입력해주세요!"
                        name="loginid"
                        value={formData.loginid}
                        onChange={handleChange}
                        disabled={inputDisable.isloginid}
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
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password2">비밀번호확인</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="작성한 비밀번호를 입력해주세요!"
                        name="password2"
                        value={formData.password2}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="name">이름</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="이름을 입력해주세요!"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="text">핸드폰 번호</label>
                    <input
                        id="phone"
                        type="text"
                        placeholder="핸드폰번호를 입력해주세요!"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email을 입력해주세요!"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={inputDisable.isEmail}
                    />
                      <button type='button' onClick={onCheckEmail}>이메일체크</button>
                </div>
                <div>
                    <label htmlFor="address">주소</label>
                    <input
                        id="address"
                        type="address"
                        placeholder="주소를 입력해주세요!"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="address2">상세주소</label>
                    <input
                        id="address2"
                        type="address2"
                        placeholder="상세주소를 입력해주세요!"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label >성별</label>
                    <input type="radio" name="gender" id="male" value="male"   checked={formData.gender === 'male'} onChange={handleChange}/>
                    <label htmlFor="male">남성</label>
                    <input type="radio" name="gender" id="female" value="female"  checked={formData.gender === 'female'} onChange={handleChange}/>
                    <label htmlFor="female">여성</label>
                </div>
                <div>
                    <label htmlFor="address">SMS수신동의</label>
                    <input type="radio" name="sms" id="sms_yes" value="yes"  checked={formData.sms === 'yes'} onChange={handleChange}/>
                    <label htmlFor="male">동의</label>
                    <input type="radio" name="sms" id="sms_no" value="no" checked={formData.sms === 'no'} onChange={handleChange} />
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
