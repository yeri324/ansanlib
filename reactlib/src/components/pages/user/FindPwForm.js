//import './FindIdForm.css';
import { useState } from 'react';
import axios from 'axios';

const FindPwForm = () => {
    const [loginid, setLoginid] = useState('');
    const [email, setEmail] = useState('');
    const [sendCode, setSendCode] = useState(false);
    const [error, setError] = useState(false);
    const [FindPwForm, setFindPwForm] = useState({
        loginid: '',
        email: '',
    });

    const handleIdChange = (foundId, useremail) => {
        setLoginid(foundId);
        setEmail(useremail);
        setSendCode(true);
        setError(false); // 인증되면
    };

    const handleIdChangeError = () => {
        setError(true);
    };

    const handleFindPw= (e) => {
        e.preventDefault();

        if (!FindPwForm.loginid || !FindPwForm.email) {
            alert('아이디와 이메일을 입력해주세요.');
            return;
        }

        axios({
            url: '/api/user/findPw', // 요청할 엔드포인트
            method: 'post',
            data: {
                loginid: FindPwForm.loginid,
                email: FindPwForm.email,
               
            },
            baseURL: 'http://localhost:8090', // 백엔드 서버의 주소
            withCredentials: true // 인증 정보 포함
        })
            .then((response) => {
                if (response.status === 200) {
                    alert('인증에 성공하였습니다.');
                    const loginid = response.data;
                    handleIdChange(loginid, FindPwForm.email);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    console.log(FindPwForm);
                    alert('존재하지 않는 회원이거나 잘못 입력된 정보입니다.');
                    handleIdChangeError();
                } else {
                    alert('오류가 발생했습니다.');
                }
            });
    };

    return (
        <div className="findPw">
            {!sendCode && !error && (
                <div className="findPw_input">
                    <div className="title">비밀번호 찾기</div>
                    <div className="line"></div>
                    <div id="findId_input_INFO">
                        <div>
                            <div>
                            <div>
                                <label>아이디
                                    <input
                                    type="text"
                                        placeholder="아이디 입력"
                                        value={FindPwForm.loginid}
                                        onChange={(e) => setFindPwForm({ ...FindPwForm, loginid: e.target.value })}
                                    />
                                </label>
                            </div>
                            <label>이메일
                                <input
                                type="email"
                                    placeholder='이메일 입력("@" 포함)'
                                    value={FindPwForm.email}
                                    onChange={(e) => setFindPwForm({ ...FindPwForm, email: e.target.value })}
                                />
                            </label>
                        </div>
                        <button type="submit" id="find_btn" onClick={handleFindPw}>
                            인증하기
                        </button>
                        </div>
                        <button type="button" className='findId_btn' onClick={() => window.location.href = '/findid'}>아이디 찾기</button>
                        <button type="button" className='login_btn' onClick={() => window.location.href = '/login'}>돌아가기</button>
                    </div>
                </div>
            )}
            {sendCode && (
                <div className="send_code">
                    <div className="title">비밀번호 찾기</div>
                    <div className="line"></div>
                    <div id="findPw_show_pw">
                        <div className="show_pw">
                             ✔<br /><br />{email} 로 <br />임시 비밀번호를 발송하였습니다.

                        </div>
                        <button  id="go_login"><a href="/login">로그인 하러가기</a></button>
                    </div>
                </div>
            )}
            {error && (
                <div className="findId_notExist">
                    <div className="title">비밀번호 찾기</div>
                    <div className="line"></div>
                    <div id="findPw_show_notExist">
                        <div className="show_notExist">
                            ❗<br/><br/>존재하지 않는 회원입니다.
                        </div>
                        <button  id="go_signUp"><a href="/join">회원가입 하기</a></button>
                        <button id="findid_btn" onClick={() => window.location.href = '/findid'}>아이디찾기</button>
                        <button id="login_btn" onClick={() => window.location.href = '/login'}>돌아가기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindPwForm;
