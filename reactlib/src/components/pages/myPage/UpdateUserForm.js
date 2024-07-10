import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

const UpdateUserForm = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        address: '',
        address2: '',
        phone: '',
        sms: ''
    })
   
    const[isOpen, setIsOpen] = useState(false);
    const[zonecode, setZonecode] = useState('');

    useEffect(() => {
        const memberData = JSON.parse(sessionStorage.getItem("member") ?? "null");
        if (memberData?.userId){
            axios.get('/api/user/myinfo')
            .then(response => {
                const { name, email, address, address2, phone, sms} =response.data;
                setUserInfo({ name, email, address, address2, phone, sms }); // 서버로부터 받은 회원 정보 중 필요한 필드만 상태에 설정
            })
            .catch(error => {
                console.error('회원 정보를 불러오는 중 오류가 발생했습니다.',error);
            });
        } else {
            alert("로그인이 되어있지 않습니다.");
            navigate("/login");        
        }
        
    },[navigate]);

    const handleChange = (e) => {
        setUserInfo({
          ...userInfo,
          [e.target.name]: e.target.value
        });
    };

    //시큐리티 세션 적용되기 전까지 임시조치. 다른 페이지에서 변경된 이름이 올바르게 나오게 하기 위함.
    const updateSession = () => {
      let memberData = JSON.parse(sessionStorage.getItem("member") ?? "null");
      memberData.name = userInfo.name;
      sessionStorage.setItem("member", JSON.stringify(memberData));
    };
    
    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        const hyphenatedPhoneNumber = value.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
        setUserInfo({ ...userInfo, phone: hyphenatedPhoneNumber });
    };
    
    const completeHandler = (data) => {
        const { address, zonecode } = data;
        setZonecode(zonecode);
        setUserInfo(prevFormData => ({
          ...prevFormData,
          address: address,
          zonecode: zonecode
        }));
    };
    
    const closeHandler = (state) => {
        if (state === 'FORCE_CLOSE' || state === 'COMPLETE_CLOSE') {
          setIsOpen(false);
        }
    };
    
    const toggleHandler = () => {
        setIsOpen((prevOpenState) => !prevOpenState); // isOpen 상태를 토글
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/user/update', userInfo)
          .then(response => {
            //시큐리티 세션 적용되기 전까지 임시조치. 다른 페이지에서 변경된 이름이 올바르게 나오게 하기 위함.
            updateSession();
            alert('회원 정보가 성공적으로 업데이트 되었습니다.');
            console.log(response.data);
            navigate('/home');
          })
          .catch(error => {
            alert('회원 정보 업데이트 중 오류가 발생했습니다.');
            console.error(error);
          });
      };
    
      return (
        <div className="update_form">
          <div className="title">
            <h2>회원 정보 수정</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="update_center">
              <div className="subtitle">
                <div id="subtitle1">
                  <div>기본 정보 입력</div>
                  <span>*은 필수 입력 사항입니다.</span>
                </div>
                <div className="base_info">
                  <div className="base_left">
                    <ul className="base_left1">
                      <li>* 이름</li>
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
                      <li><input name="name" value={userInfo.name} onChange={handleChange} /></li>
                      <li><input type="text" name="phone" maxLength="13" value={userInfo.phone} onChange={handlePhoneNumberChange} /></li>
                      <li><input className='email' name="email" value={userInfo.email} onChange={handleChange} /></li>
                      <li>
                        <div>
                          <div className='dis_add'>
                            <div className='zonecode'>
                              <div className="zonecode_view">
                                {zonecode}
                              </div>
                              <button className='address_btn' type="button" onClick={toggleHandler}>
                                우편번호 조회
                              </button>
                            </div>
                          </div>
                          {isOpen && (
                            <div>
                              <DaumPostcode onComplete={completeHandler} onClose={closeHandler} />
                            </div>
                          )}
                          <div className='address1'>
                            <input name="address" value={userInfo.address} onChange={handleChange} />
                          </div>
                          <input className='add_input' name="address2" value={userInfo.address2} onChange={handleChange} placeholder="상세주소 입력" />
                        </div>
                      </li>
                    </ul>
                    <ul className="base_right2">
                      <li>
                        <input type="radio" name="sms" id="sms_yes" value="yes" checked={userInfo.sms === 'yes'} onChange={handleChange} />
                        <label htmlFor="sms_yes">동의</label>
                        <input type="radio" name="sms" id="sms_no" value="no" checked={userInfo.sms === 'no'} onChange={handleChange} />
                        <label htmlFor="sms_no">비동의</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" id="update_btn">정보 수정하기</button>
          </form>
        </div>
      );
    };
export default UpdateUserForm;
