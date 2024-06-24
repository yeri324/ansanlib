import React, { useState } from 'react';
import axios from 'axios';

function FindPwForm() {
    const [formData, setFormData] = useState({
        email: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleResetPassword = async () => {
        try {
            const res = await axios.post('/api/resetPassword', {
                email: formData.email
            });

            if (res.data.success) {
                setSuccessMessage('임시 비밀번호가 이메일로 발송되었습니다.');
                setErrorMessage('');
            } else {
                setSuccessMessage('');
                setErrorMessage('이메일 주소를 확인해주세요.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <h2>비밀번호 찾기</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="이메일 입력"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleResetPassword}
                >
                    임시비밀번호받기
                </button>
            </form>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
       
            <button type="button" className="btn btn-primary" onClick={() => window.location.href = '/login'}>
                    로그인하기
                </button>
        </div>
    );
}

export default FindPwForm;
