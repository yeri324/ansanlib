import React, { useState, useEffect } from 'react';
import useAuth, { LOGIN_STATUS } from '../../hooks/useAuth';
import RedirectLogin from '../../helpers/RedirectLogin';
import Auth from '../../helpers/Auth';
import DaumPostcode from 'react-daum-postcode';
import { info, update } from '../security/apis/auth';
import { getData } from '../security/apis/auth';
import Header from '../../fragments/header/header';
import Footer from '../../fragments/footer/footer';
import Side from './Side';
import './UpdateUserForm.css';

const emailCommonDomains = [
  "naver.com",
  "gmail.com",
  "daum.net",
  "hanmail.net",
  "name.com",
];

const UpdateUserForm = () => {
  const { axios } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    email1: '',
    email2: '',
    phone: '',
    address: '',
    address2: '',
    sms: false,
    gender: ''
  });
  const [inputDisable, setInputDisable] = useState({
    isEmail: false,
  });
  const [initialEmail, setInitialEmail] = useState();
  const initData = async () => {
    const initialUserInfo = (await info()).data;
    setUserInfo({
      name: initialUserInfo?.name ?? '',
      email: initialUserInfo?.email ?? '',
      email1: initialUserInfo?.email.split('@')[0] ?? '',
      email2: initialUserInfo?.email.split('@')[1] ?? '',
      phone: initialUserInfo?.phone ?? '',
      address: initialUserInfo?.address ?? '',
      address2: initialUserInfo?.address2 ?? '',
      sms: initialUserInfo?.sms ?? '',
      gender: initialUserInfo?.gender ?? ''
    });
    setInitialEmail(initialUserInfo?.email ?? '');
  };

  //최초 데이터 불러오기
  useEffect(() => { initData() }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await update(userInfo);
      alert("변경되었습니다.");
    } catch (error) {
      alert(`에러 : ${error.response?.data || error.message}`);
      console.error('There was an error changing the info!', error);
    }
  };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  //이메일 변경 체크
  const isEmailUpdated = () => userInfo.email !== initialEmail;

  
  // 이메일 중복 체크
  const onCheckEmail = async () => {
    if (userInfo.email1 === null || userInfo.email2 === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    const email = userInfo.email1 + '@' + userInfo.email2;
    const data = { email };
    try {
      const response = await getData(data);
      if (response.status === 200) {
        console.log('사용 가능한 이메일!');
        alert("사용 가능한 이메일입니다.");
        setInputDisable({ ...inputDisable, isEmail: true });
      }
    } catch (error) {
      if (error.response.status === 409) {
        console.log('사용중인 이메일!');
        alert("사용 할 수 없는 이메일입니다.");
      } else {
        console.log('오류!');
        alert("조회 중 오류가 발생하였습니다.");
      }
    }
  };

  // 이메일 합치기
  useEffect(() => {
    setUserInfo({ ...userInfo, email: userInfo.email1 + '@' + userInfo.email2 });
  }, [userInfo.email1, userInfo.email2])

  const handleAddressComplete = (data) => {
    setUserInfo({ ...userInfo, address: data.address });
    setIsOpen(false); // 주소 선택 후 팝업을 닫습니다.
  };

  // 주소창 닫기
  const closeHandler = (state) => {
    setIsOpen(false);
  };

  // 주소창 열기
  const toggleHandler = () => {
    console.log(isOpen);
    console.log('toggleHandler 실행됨');
    setIsOpen(!isOpen); // isOpen 상태를 토글
  };

  return (
    <div className="mypage-container">
      <div className='mypage-header'>
        <h2 className='mypage-header-name'>회원 정보 수정</h2>
      </div>


      <form className="update-form" onSubmit={handleSubmit}>
        <div class="form_section">
          <h3 class="section_title">기본 정보 입력</h3>
          <p class="required_notice">*은 필수 입력 사항입니다.</p>

          <div class="form_field">
            <label htmlFor="name">* 이름</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
            />
          </div>

          <div class="form_field">
            <label htmlFor="phone">* 휴대폰 번호</label>
            <input
              type="text"
              id="phone"
              name="phone"
              maxLength="13"
              value={userInfo.phone}
              onChange={handleChange}
            />
          </div>

          <div class="form_field">
            <label htmlFor="email">* 이메일</label>
            <div class="email_input">
              <input
                id="email1"
                type="text"
                placeholder="이메일"
                name="email1"
                value={userInfo.email1}
                onChange={handleChange}
                disabled={inputDisable.isEmail}
              />
              <span>@</span>
              <select
                value={userInfo.email2}
                name="email2"
                disabled={inputDisable.isEmail}
                onChange={handleChange}
              >
                <option value="naver.com">naver.com</option>
                <option value="gmail.com">gmail.com</option>
                <option value="daum.net">daum.net</option>
                <option value="hanmail.net">hanmail.net</option>
                <option value="nate.com">nate.com</option>
              </select>
              <button type="button" onClick={onCheckEmail} disabled={!isEmailUpdated()}>이메일 체크</button>
            </div>
            {/* <EmailInput candidates={emailCommonDomains} email={userInfo.email} onEmailChanged={(email) => setUserInfo({ ...userInfo, email })} /> */}
          </div>

          <div class="form_field">
            <label htmlFor="address">* 주소</label>
            <div class="address_input">
              <input
                type="text"
                id="address"
                name="address"
                value={userInfo.address}
                readOnly
              />
              <button type="button" class="address_btn" onClick={toggleHandler}>주소 찾기</button>
            </div>
          </div>

          {isOpen && (
            <div class="daum-address-popup">
              <button type="button" id="close-button" onClick={closeHandler}>&times;</button>
              <DaumPostcode
                onComplete={handleAddressComplete}
                onClose={closeHandler}
                autoClose
              />
            </div>
          )}

          <div class="form_field">
            <label htmlFor="address2">* 상세주소</label>
            <input
              type="text"
              id="address2"
              name="address2"
              value={userInfo.address2}
              onChange={handleChange}
              placeholder="상세주소"
            />
          </div>

          <div class="form_field">
            <label>성별</label>
            <div class="radio_group">
              <input
                type="radio"
                id="MALE"
                name="gender"
                value="MALE"
                checked={userInfo.gender === 'MALE'}
                onChange={handleChange}
              />
              <label htmlFor="MALE" class='check-label'><span>남성</span></label>

              <input
                type="radio"
                id="FEMALE"
                name="gender"
                value="FEMALE"
                checked={userInfo.gender === 'FEMALE'}
                onChange={handleChange}
              />
              <label htmlFor="FEMALE" class='check-label'><span>여성</span></label>
            </div>
          </div>

          <div class="form_field">
            <label htmlFor="sms">SMS수신</label>
            <div class="radio_group">
              <input
                type="radio"
                id="sms_yes"
                name="sms"
                value="yes"
                checked={userInfo.sms === 'yes'}
                onChange={handleChange}
              />
              <label htmlFor="sms_yes" class='check-label'><span>동의</span></label>

              <input
                type="radio"
                id="sms_no"
                name="sms"
                value="no"
                checked={userInfo.sms === 'no'}
                onChange={handleChange}
              />
              <label htmlFor="sms_no" class='check-label'><span>비동의</span></label>
            </div>
          </div>
          <div className='button_align'>
            <button className="button" type="submit">정보 수정하기</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
        <Header />
        <div className="MyPage-body">
          <Side />
          <UpdateUserForm />
        </div>
        <Footer />
      </Auth>
    </>
  );
};
