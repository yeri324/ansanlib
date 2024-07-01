import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';


const JoinForm = () => {

    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [idAvailable, setIdAvailable] = useState(false);

    // const [passwordMatch, setPasswordMatch] = useState(true); //pw validation
    // const [emailAvailable, setEmailAvailable] = useState(false); //email validation
    // const [isEmail, setIsEmail] = useState(true); //email
    // const [addressEditable, setAddressEditable] = useState(true); //address
    // const [isValidPhone, setIsValidPhone] = useState(false); //phone validation

    const [isOpen, setIsOpen] = useState(false);
    const [zonecode, setZonecode] = useState('');

    //추후 이용약관 사용시 아래 4,5 활용해서 동의 체크받기
    // const [agreement4Checked, setAgreement4Checked] = useState(false);
    // const [agreement5Checked, setAgreement5Checked] = useState(false);
    // const handleAgreement4Change = () => {
    //     setAgreement4Checked(!agreement4Checked);
    // };
    // const handleAgreement5Change = () => {
    //     setAgreement5Checked(!agreement5Checked);
    // };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        loginid: '',
        password: '',
        password2: '',
        phone: '',
        address: '',
        address2: '',
        gender: '',
        sms: '',
    });

    //아이디체크
    const checkUserId = () => {
        axios(
            {
                url: '/api/user/checkId',
                method: 'get',
                data: { formData },
                baseURL: 'http://localhost:8090',
            }
        ).then(response => {
            alert(response.data);
            if (response.status === 200) {
                setIdAvailable(true);
            }
        })
            .catch(error => {
                alert(error.response.data);
                console.log(formData.loginid + "*****************************");
                console.error(error);
            });
    };

    //이메일 양식
    const handleEmailChange = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            email: `${prevFormData.email}`,
        }));
    };

    //핸드폰 번호
    const handleChange = (str) => {
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

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        const hyphenatedPhoneNumber = handleChange(value);
        setFormData({ ...formData, phone_number: hyphenatedPhoneNumber });
    };

    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setAddress(address);
        setFormData(prevFormData => ({
            ...prevFormData,
            address: address,
            zonecode: zonecode
        }));
    };

    const closeHandler = (state) => {
        if (state === 'FORCE_CLOSE' || state === 'COMPLETE_CLOSE') { // 모달이 닫힐 때 isOpen 상태를 false로 설정
            setIsOpen(false);
        }
    };

    const toggleHandler = () => {
        setIsOpen((prevOpenState) => !prevOpenState); // isOpen 상태를 토글
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (!formData.name || !formData.loginid || !formData.password || !formData.password2 || !formData.phone || !formData.email || !formData.address || !formData.gender || !formData.sms) {
            let errorMessage = '다음 필수 입력 값을 입력해주세요:\n';

            if (!formData.name) errorMessage += '- 이름\n';
            if (!formData.loginid) errorMessage += '- 아이디\n';
            if (!formData.password) errorMessage += '- 비밀번호\n';
            if (!formData.password2) errorMessage += '- 비밀번호 확인\n';
            if (!formData.phone) errorMessage += '- 휴대폰 번호\n';
            if (!formData.email) errorMessage += '- 이메일\n';
            if (!formData.address) errorMessage += '- 주소\n';
            if (!formData.gender) errorMessage += '- 성별\n';
            if (!formData.message_agreement) errorMessage += '- 문자 수신 동의\n';

            alert(errorMessage);
            return;
        }

        //추후 이용약관 이용시 사용
        // if (!agreement4Checked || !agreement5Checked) {
        //     alert("이용약관에 모두 동의해야 회원가입이 가능합니다.");
        //     return;
        // }
        axios.post('/api/user/join', formData)
            .then(response => {
                alert(response.data);
                console.log(response.data); // 회원가입 성공 시 처리
                navigate("/login");
            })
            .catch(error => {
                alert(error.response.data);
                console.error(error); // 오류 발생 시 처리
            });
    };

    return (

        <div class="join_form">
            <div className="title">
                <h2>회원가입창 &nbsp; &nbsp;<span>signUp</span></h2>
            </div>
            <form onSubmit={handleSignUp} >
                <div className="signUp_center">
                    <div className="subtitle">
                        <div id="subtitle1">
                            <div>기본 정보 입력</div>
                            <text>*은 필수 입력 사항입니다.</text>
                        </div>
                        <div className="base_info">
                            <div className="base_left">
                                <ul className="base_left1">
                                    <li>* 이름</li>
                                    <li>* 성별</li>
                                    <li>* 아이디</li>
                                    <li>* 비밀번호</li>
                                    <li>* 비밀번호 확인</li>
                                    <li>* 휴대폰 번호</li>
                                    <li>* 이메일</li>
                                    <li>* 주소</li>
                                    <li>* 상세주소</li>
                                </ul>
                                <ul className="base_left2">
                                    <li>* 문자수신동의</li>
                                </ul>
                            </div>
                            <div className="base_right">
                                <ul className="base_right1">
                                    <li><input name="name" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></li>
                                    <li></li>
                                    <li>
                                        <input name="loginid" id="loginid" value={formData.loginid} onChange={(e) => { setFormData({ ...formData, loginid: e.target.value }); setIdAvailable(false); }} />
                                        <button type="button" className="check_btn" id="id_check" onClick={checkUserId}> 중복확인</button>
                                        {/* {idAvailable && <span className="complete"> 중복 확인 완료</span>} */}
                                    </li>
                                    <li>
                                        <input name="password" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                                    </li>
                                    <li>
                                        <input id="password2" name="password2" value={formData.password2} onChange={(e) => setFormData({ ...formData, password2: e.target.value })} />
                                    </li>
                                    <li>
                                        <input type="text" name="phone" id="phone" maxLength="13" value={formData.phone} onChange={handlePhoneNumberChange} />
                                    </li>
                                    <li className='email'>
                                        <input id="email" name="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); handleEmailChange(); }} />
                                    </li>
                                    <li>
                                        <div>
                                            <div>
                                                <div className='dis_add'>
                                                    <div className='zonecode'>
                                                        <div className="zonecode_view">
                                                            {zonecode}
                                                        </div>
                                                        <button className='address_btn'
                                                            type="button"
                                                            onClick={toggleHandler}>
                                                            우편번호 조회
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {isOpen && (
                                                <div>
                                                    <DaumPostcode
                                                        onComplete={completeHandler}
                                                        onClose={closeHandler}
                                                        value={formData.address}
                                                    />
                                                </div>
                                            )}
                                            <div className='address1' name="address1" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}>
                                                {address}
                                            </div>
                                            <input className='add_input'
                                                name="address2"
                                                value={formData.address2}
                                                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                                                placeholder="상세주소 입력"
                                            />
                                        </div>
                                    </li>

                                </ul>
                                <ul className="base_right2">
                                    <li>
                                        <input type="radio" className="radio" name="message_agreement" id="message_agreement" value={true} onChange={(e) => setFormData({ ...formData, message_agreement: e.target.value })} />
                                        <label htmlFor="message_agreement">동의</label>
                                        <input type="radio" className="radio" name="message_agreement" id="message_disagreement" value={false} onChange={(e) => setFormData({ ...formData, message_agreement: e.target.value })} />
                                        <label htmlFor="message_agreement">비동의</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                {/* 추후약관 사용*/}
                {/* <div className="subtitle">
	                    <div id="subtitle3">
	                        <div>이용약관 및 동의</div>
	                        <text>*은 필수 입력 사항입니다.</text>
	                    </div>
	                    <div className="agreement">
	                        <div id="agreement1">
	                            <div className="agreement_title">* 이용약관</div>
	                            <div className="agreement_content1">이용약관 내용</div>
	                            이용약관에 동의하시겠습니까?&nbsp;&nbsp;
	                            <input type="checkbox" className="checkbox" name="agreement" checked={agreement4Checked} onChange={handleAgreement4Change} />
	                            <label htmlFor="agreement1"></label>
	                        </div>
	                        <div id="agreement2">
	                            <div className="agreement_title">* 개인정보 수집 및 이용 동의</div>
	                            <div className="agreement_content2">이용약관 내용</div>
	                            개인정보 수집 및 이용 목적에 동의하시겠습니까?&nbsp;&nbsp;
	                            <input type="checkbox" className="checkbox" name="agreement" checked={agreement5Checked} onChange={handleAgreement5Change} />
	                            <label htmlFor="agreement1"></label>
	                        </div>
	                        
	                    </div>
	                </div> */}
                <button type="submit" id="signUp_btn" >회원가입하기</button>
            </form>

            {/* <div className="input-box">
                <label>
                    아이디
                    <input className="long-input" type="text" value={formData.loginid} onChange={(e) => {
                        setFormData({ ...formData, loginid: e.target.value });
                        setIdAvailable(false);
                    }} />

                </label>
                <button className="center-button" onClick={checkUserId}>중복 확인</button>
                <div>
                    {idAvailable && <span className="complete">중복 확인 완료</span>}</div>
            </div>

            <div className="input-box">
                <label>
                    비밀번호:
                    <input className="long-input" type="password" value={formData.password} onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        setPasswordMatch(false);
                    }} onBlur={handlePasswordMatch} />
                </label>
            </div>

            <div className="input-box">
                <label>
                    비밀번호 확인
                    <input className="long-input" type="password" value={formData.password2} onChange={(e) => {
                        setFormData({ ...formData, password2: e.target.value });
                        setPasswordMatch(false);
                    }} onBlur={handlePasswordMatch} />
                </label>
                {!passwordMatch && <span className="error">비밀번호가 일치하지 않습니다.</span>}
            </div>

            <div className="input-box">
                <label>
                    이름
                    <input className="long-input" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </label>
            </div>

            <div className="input-box">
                <label>
                    이메일: {emailAvailable && <span className="complete">중복 확인 완료</span>}
                    <input className="long-input" type="text" value={formData.email} onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        setEmailAvailable(false);
                    }} />
                </label>

            </div>

            <div className="input-box">
                <label>
                    전화번호
                    <input className="long-input" type="text" name="phone" placeholder="(-제외 11자리)" value={formData.phone}
                        onChange={(e) => handleChange(e)} />
                </label>

            </div>

            <div className="input-box">
                <label>주소
                    <input type="text" id="sample4_postcode" placeholder="우편번호" value={formData.postcode} disabled />
                    <input type="button" onClick={handlePostcode} value="우편번호 찾기" /><br />
                    <input type="text" id="sample4_roadAddress" placeholder="도로명주소" value={formData.roadAddress} disabled />
                    <input type="text" id="sample4_jibunAddress" placeholder="지번주소" value={formData.jibunAddress} disabled />
                    <span id="guide" style={{ color: '#999', display: 'none' }}></span>

                    <input type="text" id="sample4_extraAddress" placeholder="참고항목" value={formData.extraAddress} disabled />
                    <input type="text" id="sample4_detailAddress" placeholder="상세주소" />
                </label>
            </div>



            <div className="input-box">
                <label>성별
                    <input
                        type="radio"
                        name="gender"
                        value="남"
                        checked={formData.gender === '남'}
                        onChange={handleChange}
                    />
                    남
                </label>
                <label>
                    <input
                        type="radio"
                        name="gender"
                        value="여"
                        checked={formData.gender === '여'}
                        onChange={handleChange}
                    />
                    여
                </label>
            </div>

            <div className="input-box">
                <label>sms수신동의
                    <input
                        type="radio"
                        name="sms"
                        value="yes"
                        checked={formData.sms === 'yes'}
                        onChange={handleChange}
                    />
                    예
                </label>
                <label>
                    <input
                        type="radio"
                        name="sms"
                        value="no"
                        checked={formData.sms === 'no'}
                        onChange={handleChange}
                    />
                    아니오
                </label>
            </div>

            <button className="find-join-btn" onClick={handleSignUp}>회원가입</button>
            <button className="find-login-btn" onClick={() => window.location.href = '/login'}>
                로그인하기
            </button>
            </form> */}
        </div>
    );
};

export default JoinForm;