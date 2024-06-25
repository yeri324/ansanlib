import React, { useState } from "react";
import axios from "axios";

const FindPwForm = () => {
    const [formData, setFormData] = useState({
        loginid: "",
        email: "",
    });

    const [verificationStatus, setVerificationStatus] = useState({
        loginidVerified: false,
        emailVerified: false,
    });

    const [emailCode, setEmailCode] = useState("");

    // 사용자 확인
    const verifyUserDetails = () => {
        const { loginid, email } = formData;
        axios.post("/api/member/verify", { loginid, email })
            .then(response => {
                if (response.status === 200) {
                    setVerificationStatus({ ...verificationStatus, loginidVerified: true });
                    alert("사용자 정보가 확인되었습니다.");
                    sendEmailCode();  // 사용자 확인 후 이메일 인증 코드 전송
                }
            })
            .catch(error => {
                alert("사용자 정보가 일치하지 않습니다.");
                console.error(error);
            });
    };

    // 이메일 인증 코드 전송
    const sendEmailCode = () => {
        axios.post('/api/auth/sendCode', { email: formData.email })
            .then(response => {
                if (response.status === 200) {
                    alert("인증번호가 발송되었습니다.");
                }
            })
            .catch(error => {
                alert("인증번호 전송이 실패하였습니다.");
                console.error(error);
            });
    };

    // 이메일 인증 코드 확인
    const handleVerification = () => {
        axios.post('/api/auth/verifyCode', { email: formData.email, code: emailCode })
            .then(response => {
                if (response.data === "인증되었습니다.") {
                    setVerificationStatus({ ...verificationStatus, emailVerified: true });
                    alert("이메일이 인증되었습니다.");
                } else {
                    alert("이메일 인증번호가 일치하지 않습니다.");
                }
            })
            .catch(error => {
                alert("이메일 인증번호가 일치하지 않습니다.");
                console.error(error);
            });
    };

    return (
        <div className="FindPwd-compo">
            <div className="form-box">
                <div className="input-icon">
                    <h2>비밀번호 찾기</h2>
                </div>
                <div className="input-box">
                    <label>
                        아이디:
                        <input 
                            type="text" 
                            value={formData.loginid} 
                            onChange={(e) => setFormData({ ...formData, loginid: e.target.value })} 
                        />
                    </label>
                </div>
                <div className="input-box">
                    <label>
                        이메일:
                        <input 
                            type="text" 
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        />
                    </label>
                </div>
                <div className="btn-box">
                    <button type="button" onClick={verifyUserDetails}>사용자 확인</button>
                </div>
                {verificationStatus.loginidVerified && (
                    <div>
                        <div className="input-box">
                            <label>
                                이메일 인증 코드:
                                <input 
                                    type="text" 
                                    value={emailCode} 
                                    onChange={(e) => setEmailCode(e.target.value)} 
                                />
                            </label>
                        </div>
                        <div className="btn-box">
                            <button type="button" onClick={handleVerification}>이메일 인증</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindPwForm;
