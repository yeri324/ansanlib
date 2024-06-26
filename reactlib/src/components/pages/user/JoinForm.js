import React, { useState, useEffect } from "react";
import axios from "axios";

const JoinForm = ({ isLoggedIn }) => {
    if (isLoggedIn) {
        window.location.href = "/login";
    }

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

    const [idAvailable, setIdAvailable] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [isEmail, setIsEmail] = useState(true);

    
    const [errorMessage, setErrorMessage] = useState('');
    const [addressEditable, setAddressEditable] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(false);

   

    const checkUserId = () => {
        axios.get("http://localhost:8090/api/user/checkId", { params: { loginid: formData.loginid } })
        
            .then(response => {
                if (response.status === 200) {
                    alert(response.data);
                    setIdAvailable(true);
                }
            })
            .catch(error => {
                if (error.response) {
                    alert(error.response.data);
                    console.error(error.response.data);
                } else {
                    alert("중복 확인 요청 중 문제가 발생했습니다.");
                    console.error(error);
                }
            });
    };


    // const checkEmail = () => {
    //     axios.get("/api/checkEmail?email=" + formData.email)
    //         .then(response => {
               
    //             if (response.status === 200) {
    //                 alert(response.data);
    //                 setEmailAvailable(true);
    //             }
    //         })
    //         .catch(error => {
    //             alert(error.response.data);
    //             console.error(error);
    //         });
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            const reNum = value.replace(/[^0-9]/g, "");
            setFormData({ ...formData, [name]: reNum });
            setIsValidPhone(/^[0-9]{11}$/.test(reNum));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const addressRegEx = /.+/;
    const addressIsValid = addressRegEx.test(formData.extraAddress);

    let formIsValid = false;
    if (addressIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = () => {
        const userData = {
            address: formData.jibunAddress,
            address2: formData.extraAddress,
        };
       // setFormData({ ...formData, address: userData.jibunAddress, address2: userData.extraAddress });
    };




    useEffect(() => {
        formSubmitHandler();
    }, [formData.address, formData.address2]);

    const handlePostcode = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                let roadAddr = data.roadAddress; // 도로명 주소 변수
                let extraRoadAddr = ''; // 참고 항목 변수

                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if (extraRoadAddr !== '') {
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                setFormData({
                    ...formData,
                    // postcode: data.zonecode,
                    // roadAddress: roadAddr,
                    // address: data.jibunAddress,
                    // address2: extraRoadAddr,

                    postcode: data.zonecode,
                    roadAddress: roadAddr,
                    jibunAddress: data.jibunAddress,
                    extraAddress: extraRoadAddr,
                    address: data.jibunAddress,
                    address2: extraRoadAddr
                });

                setAddressEditable(false);

                const guideTextBox = document.getElementById('guide');
                if (data.autoRoadAddress) {
                    const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                    guideTextBox.style.display = 'block';
                } else if (data.autoJibunAddress) {
                    const expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                    guideTextBox.style.display = 'block';
                } else {
                    guideTextBox.innerHTML = '';
                    guideTextBox.style.display = 'none';
                }
            }
        }).open();
    };






    const handleSignUp = () => {
        const missingFields = [];
    
        if (formData.name === "") missingFields.push("이름");
        if (formData.email === "") missingFields.push("이메일");
        if (formData.loginid === "") missingFields.push("아이디");
        if (formData.password === "") missingFields.push("비밀번호");
        if (formData.password2 === "") missingFields.push("비밀번호 확인");
        if (formData.phone === "") missingFields.push("전화번호");
        if (formData.gender === "") missingFields.push("성별");
        if (formData.address ==="")  missingFields.push("주소");
        if (formData.sms === "") missingFields.push("SMS 수신 동의");
    
        if (missingFields.length > 0) {
            const missingFieldsMessage = missingFields.join(", ");
            alert(`다음 값을 입력해주세요: ${missingFieldsMessage}`);
        } else {
            if (passwordMatch && isValidPhone && ((formData.password).length >= 8)) {
                console.log(formData);
                axios({
                    url: '/api/user/join', // 요청할 엔드포인트
                    method: 'post',
                    data: {
                        name: formData.name,
                        email: formData.email,
                        loginid: formData.loginid,
                        password: formData.password,
                        password2: formData.password2,
                        phone: formData.phone,
                        address: formData.jibunAddress,
                        address2: formData.extraAddress,
                        gender: formData.gender,
                        sms: formData.sms,
                    },
                    baseURL: 'http://localhost:8090', // 백엔드 서버의 주소
                    withCredentials: true // 인증 정보 포함
                })
                .then(response => {
                    alert(response.data);
                    console.log(response.data); // 회원가입 성공 시 처리
                    window.location.href = '/login';
                })
                .catch(error => {
                    if (error.response) {
                        alert(error.response.data); // 서버에서 응답이 온 경우 에러 메시지 출력
                        console.error(error.response.data);
                    } else if (error.request) {
                        alert("서버로 요청을 보내는 중에 문제가 발생했습니다."); // 요청이 보내지지 않은 경우 에러 메시지 출력
                        console.error(error.request);
                    } else {
                        alert("오류가 발생했습니다."); // 요청 설정이 잘못된 경우 에러 메시지 출력
                        console.error('Error', error.message);
                    }
                });
            } else {
                // 필수 조건이 충족되지 않았을 때 처리
                if (!idAvailable) {
                    alert("아이디 중복 확인이 필요합니다.");
                } else if (!passwordMatch) {
                    alert("비밀번호가 일치하지 않습니다.");
                } else if (!isValidPhone) {
                    alert("전화번호의 형식이 잘못되었습니다.");
                } else if (formData.password.length < 8) {
                    alert("비밀번호는 8자 이상이어야 합니다.");
                }
            }
        }
    };
    
    const handlePasswordMatch = () => {
        setPasswordMatch(formData.password === formData.password2);
    };

    return (
        <div>
            {errorMessage && <script>alert(errorMessage);</script>}

            <div className="userFormPage">
                <h2>회원가입창 &nbsp; &nbsp;<span>signUp</span></h2>
            </div>

            <div className="input-box">
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
                        <input type="text" id="sample4_postcode" placeholder="우편번호" value={formData.postcode}disabled />
                        <input type="button" onClick={handlePostcode} value="우편번호 찾기" /><br />
                        <input type="text"  id="sample4_roadAddress" placeholder="도로명주소" value={formData.roadAddress} disabled />
                        <input type="text" id="sample4_jibunAddress" placeholder="지번주소" value={formData.jibunAddress} disabled />
                        <span id="guide" style={{ color: '#999', display: 'none' }}></span>
                      
                        <input type="text"  id="sample4_extraAddress" placeholder="참고항목" value={formData.extraAddress} disabled />
                        <input type="text" id="sample4_detailAddress" placeholder="상세주소"/>
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
        </div>
    );
};

export default JoinForm;
