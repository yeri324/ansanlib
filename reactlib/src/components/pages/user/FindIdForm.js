//import './FindIdForm.css';
import { useState } from 'react';
import axios from 'axios';

const FindIdForm = () => {
    const [loginid, setLoginid] = useState('');
    const [name, setName] = useState('');
    const [showId, setShowId] = useState(false);
    const [error, setError] = useState(false);
    const [FindIdForm, setFindIdForm] = useState({
        name: '',
        email: '',
    });

    const handleIdChange = (foundId, username) => {
        setLoginid(foundId);
        setName(username);
        setShowId(true);
        setError(false); // 아이디를 찾으면 에러를 초기화
    };

    const handleIdChangeError = () => {
        setError(true);
    };

    const handleFindId = (e) => {
        e.preventDefault();

        if (!FindIdForm.name || !FindIdForm.email) {
            alert('이름과 이메일을 입력해주세요.');
            return;
        }

        axios({
            url: '/api/user/findId', // 요청할 엔드포인트
            method: 'post',
            data: {
                name: FindIdForm.name,
                email: FindIdForm.email,
               
            },
            baseURL: 'http://localhost:8090', // 백엔드 서버의 주소
            withCredentials: true // 인증 정보 포함
        })
            .then((response) => {
                if (response.status === 200) {
                    alert('인증에 성공하였습니다.');
                    const loginid = response.data;
                    handleIdChange(loginid, FindIdForm.name);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.log(FindIdForm);
                    alert('존재하지 않는 회원이거나 잘못 입력된 정보입니다.');
                    handleIdChangeError();
                } else {
                    alert('오류가 발생했습니다.');
                }
            });
    };

    return (
        <div className="findId">
            {!showId && !error && (
                <div className="findId_input">
                    <div className="title">아이디 찾기</div>
                    <div className="line"></div>
                    <div id="findId_input_INFO">
                        <div>
                        <div>
                            <div>
                                <label>이름
                                    <input
                                        placeholder="이름 입력"
                                        value={FindIdForm.name}
                                        onChange={(e) => setFindIdForm({ ...FindIdForm, name: e.target.value })}
                                    />
                                </label>
                            </div>
                            <label>이메일
                                <input
                                    placeholder='이메일 입력("@" 포함)'
                                    value={FindIdForm.email}
                                    onChange={(e) => setFindIdForm({ ...FindIdForm, email: e.target.value })}
                                />
                            </label>
                        </div>
                        <button type="submit" id="findId_btn" onClick={handleFindId}>
                            아이디 찾기
                        </button>
                        </div>
                        <button type="button" className='findPw_btn' onClick={() => window.location.href = '/findpw'}>비밀번호 찾기</button>
                        <button type="button" className='login_btn' onClick={() => window.location.href = '/login'}>돌아가기</button>
                    </div>
                </div>
            )}
            {showId && (
                <div className="findId_show">
                    <div className="title">아이디 찾기</div>
                    <div className="line"></div>
                    <div id="findId_show_id">
                        <div className="show_id">
                            ✔<br/>{name}님의 아이디는<br/>{loginid}<br/>입니다.
                        </div>
                        <button  id="go_login"><a href="/login">로그인 하러가기</a></button>
                    </div>
                </div>
            )}
            {error && (
                <div className="findId_notExist">
                    <div className="title">아이디 찾기</div>
                    <div className="line"></div>
                    <div id="findId_show_notExist">
                        <div className="show_notExist">
                            ❗<br/><br/>존재하지 않는 회원입니다.
                        </div>
                        <button  id="go_signUp"><a href="/join">회원가입 하기</a></button>
                        <button id="find_id" onClick={() => window.location.href = '/findid'}>아이디다시찾기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindIdForm;
