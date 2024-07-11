import React, { useState, useContext, useEffect } from 'react';
import { LoginContext } from '../../contexts/LoginContextProvider';
import LoginContextConsumer from '../../contexts/LoginContextConsumer';
import DaumPostcode from 'react-daum-postcode';
import { getData } from '../../apis/auth';
import './FormJoin.css'

const FormJoin = ({ join, }) => {
    const [errors, setErrors] = useState('');
    const [formData, setFormData] = useState({
        loginid: '',
        password: '',
        password2: '',
        name: '',
        phone: '',
        email: '',
        email1: '',
        email2: '',
        address: '',
        address2: '',
        gender: 'male',
        sms: 'yes',
    });
    const [inputDisable, setInputDisable] = useState({
        isloginid: false,
        isEmail: false,
    })
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //setFormData
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const fPhone = formatPhone(value);
            setFormData({ ...formData, phone: fPhone });
        }

        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    //회원가입 메소드로 데이터 전송
    const onJoin = (e) => {
        e.preventDefault();
        onValidate();
    };

    //아이디 중복 체크
    const onCheckId = async () => {
        if (formData.loginid == null || formData.loginid == "") {
            alert("아이디를 입력해주세요.");
            return;
        }
        const data = { loginid: formData.loginid }
        try {
            await getData(data).then((response) => {
                if (response.status == 200) {
                    console.log(`사용 가능한 아이디!`);
                    alert("사용 가능한 아이디입니다.");
                    setInputDisable({ ...inputDisable, isloginid: true })
                }
            })

        } catch (error) {
            if (error.response.status == 409) {
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
    const onCheckEmail = async () => {
        if (formData.email == null || formData.email == "") {
            alert("이메일을 입력해주세요.");
            return;
        }
        const data = { email: formData.email }
        try {
            await getData(data).then((response) => {
                if (response.status == 200) {
                    console.log(`사용 가능한 이메일!`);
                    alert("사용 가능한 이메일입니다.");
                    setInputDisable({ ...inputDisable, isEmail: true })
                }
            })

        } catch (error) {
            if (error.response.status == 409) {
                console.log(`사용중인 이메일!`);
                alert("사용 할 수 없는 이메일입니다.")
            }
            else {
                console.log(`오류!`);
                alert("조회 중 오류가 발생하였습니다.")
            }
        }
    };

    //비밀번호 유효성
    const onCheckPassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d|(?=.*\W)).{8,16}$/;
        return regex.test(password);
    }

    //비밀번호 확인
    const onMatchPassword = () => {
        setPasswordMatch(formData.password === formData.password2);
    }

    //비밀번호 유효성검사 + 확인
    useEffect(() => {

        const isValid = onCheckPassword(formData.password);
        setPasswordValid(isValid);
        onMatchPassword();

    }, [formData.password, formData.password2])

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

    //주소 모달창부터~
    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleAddressComplete = () => {
        setIsModalOpen(false);
    };


    //유효성 검사 마무리
    const onValidate = () => {
        if (!inputDisable.isloginid) {
            alert('아이디 중복 체크를 완료해주세요.');
            return
        }
        if (!inputDisable.isEmail) {
            alert('이메일 중복 체크를 완료해주세요.');
            return
        }
        if (formData.name.trim() === '' || formData.name == null) {
            alert('이름을 입력해주세요.');
            return
        }
        if (formData.phone.trim() === '' || formData.phone == null) {
            alert('핸드폰번호를 입력해주세요.');
            return
        }
        if (formData.address.trim() === '' || formData.address == null) {
            alert('주소를 입력해주세요.');
            return
        }

    }

    useEffect(()=>{
        setFormData({...formData, email : formData.email1 + '@' + formData.email2})
    },[formData.email1, formData.email2])


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
                    <button type='button' disabled={inputDisable.isloginid} onClick={onCheckId}>아이디체크</button>
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요!"
                        name="password"
                        minLength={8}
                        maxLength={16}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {!passwordValid && <p style={{ color: 'red' }}>8자 이상 16자 이하로 영문자, 숫자, 특수문자 중 두 가지 이상 포함해야 합니다.</p>}
                </div>
                <div>
                    <label htmlFor="password2">비밀번호확인</label>
                    <input
                        id="password2"
                        type="password"
                        placeholder="작성한 비밀번호를 입력해주세요!"
                        name="password2"
                        minLength={8}
                        maxLength={16}
                        value={formData.password2}
                        onChange={handleChange}
                    />
                    {!passwordMatch && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}
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
                        maxLength={15}
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Email을 입력해주세요!"
                        name="email1"
                        value={formData.email1}
                        onChange={handleChange}
                        disabled={inputDisable.isEmail}
                    />@
                   <select value={formData.email2} name="email2" disabled={inputDisable.isEmail} onChange={handleChange}>
                    <option value='naver.com'>naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value='daum.net'>daum.net</option>
                    <option value='hanmail.net'>hanmail.net</option>
                    <option value='nate.com'>nate.com</option>

                </select>
                    <button type='button' onClick={onCheckEmail}>이메일체크</button>
                </div>
                <div>
                    <label htmlFor="address">주소</label>
                    {/* <input
                        id="address"
                        type="address"
                        placeholder="주소를 입력해주세요!"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    /> */}
                    <button type='button' onClick={() => setIsModalOpen(true)}>주소 검색</button>
                    {isModalOpen && (
                        <DaumPostcode
                            onComplete={handleAddressComplete}
                            autoClose = {true}
                            animation />)}
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
                <div class='join-radio'>
                    <label>성별</label>
                    <input type="radio" name="gender" id="male" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                    <label htmlFor="male" class='check-label'><span>남성</span></label>
                    <input type="radio" name="gender" id="female" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                    <label htmlFor="female" class='check-label'><span>여성</span></label>
                </div>
                <div class='join-radio'>
                    <label htmlFor="address">SMS수신</label>
                    <input type="radio" name="sms" id="sms_yes" value="yes" checked={formData.sms === 'yes'} onChange={handleChange} />
                    <label htmlFor="sms_yes" class='check-label'><span>동의</span></label>
                    <input type="radio" name="sms" id="sms_no" value="no" checked={formData.sms === 'no'} onChange={handleChange} />
                    <label htmlFor="sms_no" class='check-label'><span>비동의</span></label>
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
