import React, { useState, useEffect } from "react";
import axios from "axios";

const JoinForm = ({ isLoggedIn }) => {
    if (isLoggedIn) {
        window.location.href = "/";
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
        role: '',
        joinDate: '',
        loginDate: '',
        penalty: '',
        status: '',
    });

    const [idAvailable, setIdAvailable] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [isEmail, setIsEmail] = useState(true);

    
    const [errorMessage, setErrorMessage] = useState('');
    const [addressEditable, setAddressEditable] = useState(true);
    const [isValidPhone, setIsValidPhone] = useState(false);

   

    const checkUserId = () => {
        axios.get("/api/user/checkId?loginid=" + formData.loginid)
            .then(response => {
                alert(response.data);
                if (response.status === 200) {
                    setIdAvailable(true);
                }
            })
            .catch(error => {
                alert(error.response.data);
                console.error(error);
            });
    };

    const checkEmail = () => {
        axios.get("/api/checkEmail?email=" + formData.email)
            .then(response => {
                alert(response.data);
                if (response.status === 200) {
                    setEmailAvailable(true);
                }
            })
            .catch(error => {
                alert(error.response.data);
                console.error(error);
            });
    };

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
    const addressIsValid = addressRegEx.test(formData.address2);

    let formIsValid = false;
    if (addressIsValid) {
        formIsValid = true;
    }

    const formSubmitHandler = () => {
        const userData = {
            address: `${formData.address}`,
            address2: `${formData.address2}`,
        };
        setFormData({ ...formData, address: userData.address, address2: userData.address2 });
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
                    postcode: data.zonecode,
                    roadAddress: roadAddr,
                    jibunAddress: data.jibunAddress,
                    extraAddress: extraRoadAddr,
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
        if (formData.address === "") missingFields.push("주소");
        if (formData.gender === "") missingFields.push("성별");
        if (formData.sms === "") missingFields.push("SMS 수신 동의");

        if (missingFields.length > 0) {
            const missingFieldsMessage = missingFields.join(", ");
            alert(`다음 값을 입력해주세요: ${missingFieldsMessage}`);
        } else {
            if (idAvailable && passwordMatch && isValidPhone && ((formData.password).length >= 8)) {
                axios.post("/api/user/join", formData)
                    .then(response => {
                        alert(response.data);
                        console.log(response.data); // 회원가입 성공 시 처리
                        window.location.href = '/';
                    })
                    .catch(error => {
                        alert(error.response.data);
                        console.error(error); // 오류 발생 시 처리
                    });
            } else {
                if (!idAvailable) {
                    alert("아이디 중복확인이 필요합니다.");
                } else if (!passwordMatch) {
                    alert("비밀번호가 같지 않습니다.");
                
                    
                } else if (!isValidPhone) {
                    alert("전화번호의 형식이 잘못되었습니다.");
                } else if (!((formData.password).length >= 8)) {
                    alert("비밀번호는 8글자 이상이어야 합니다.");
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
                    아이디: {idAvailable && <span className="complete">중복 확인 완료</span>}
                    <input className="long-input" type="text" value={formData.loginid} onChange={(e) => {
                        setFormData({ ...formData, loginid: e.target.value });
                        setIdAvailable(false);
                    }} />
                </label>
                <button className="center-button" onClick={checkUserId}>중복 확인</button>
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
                {/* {!isValidPhone && <span className="error">다시 확인하여주세요</span>} */}
            </div>

            <div className="input-box">
                <label>
                    주소
                    <input className="long-input" type="text" value={formData.address} readOnly={!addressEditable} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                    <button className="center-button" onClick={handlePostcode}>주소 찾기</button>
                </label>
            </div>

            <div className="input-box">
                <label>
                    상세 주소
                    <input className="long-input" type="text" value={formData.address2} onChange={(e) => setFormData({ ...formData, address2: e.target.value })} />
                </label>
            </div>

            <div className="input-box">
                <label>
                    성별
                    <input className="long-input" type="text" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} />
                </label>
            </div>

            <div className="input-box">
                <label>
                    SMS 수신 동의
                    <input className="long-input" type="text" value={formData.sms} onChange={(e) => setFormData({ ...formData, sms: e.target.value })} />
                </label>
            </div>

            <button className="center-button" onClick={handleSignUp}>회원가입</button>
        </div>
    );
};

export default JoinForm;
