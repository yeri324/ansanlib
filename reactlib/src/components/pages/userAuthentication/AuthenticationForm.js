import React,{useState} from "react";
import axios from "axios";


const AuthenticationForm =({onVerified})=>{
    const [password, setPassword] =useState('');
    const [error, setError] =useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/verify-password', { password });
            if (response.data.success) {
                onVerified();
            } else {
                setError('비밀번호가 올바르지 않습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <h2>회원 인증</h2>
            <p>회원정보 확인을 위해 비밀번호를 입력해주세요.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">인증하기</button>
            </form>
        </div>
    );
};

export default AuthenticationForm;