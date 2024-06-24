import React, { useState } from 'react';
import axios from 'axios';

function FindIdForm() {




    const [formData, setFormData] = useState({
        email: '',
        name: ''
    });

    const [foundId, setFoundId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFindId = async () => {
        try {
            const res = await axios.post('/api/user/findId', {
                email: formData.email,
                name: formData.name
            });

            if (res.data.id) {
                setFoundId(`찾으시는 아이디는 ${res.data.id} 입니다.`);
                setErrorMessage('');
            } else {
                setFoundId('');
                setErrorMessage('일치하는 정보가 없습니다.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <h2>아이디 찾기</h2>
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
                <div className="form-group">
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="이름 입력"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleFindId}
                >
                    아이디 찾기
                </button>
            </form>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {foundId && <p className="text-success">{foundId}</p>}

            <div style={{ textAlign: 'center' }}>


                <button type="button" className="btn btn-primary" onClick={() => window.location.href = '/login'}>
                    로그인하기
                </button>
            </div>
        </div>


    );
}

export default FindIdForm;
