import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
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

const predefinedDomains = [
  "naver.com",
  "gmail.com",
  "daum.net",
  "hanmail.net",
  "nate.com",
];

const EmailInput = ({
  addressPart,
  domainPart,
  onChangeAddressPart = () => { },
  onChangeDomainPart = () => { },
  candidates = [],
  onCheckEmail = () => {} // 이메일 체크 함수
}) => {
  const [isCustomDomain, setCustomDomain] = useState(
    candidates.includes(domainPart),
  );

  useEffect(() => {
    setCustomDomain(!candidates.includes(domainPart));
  }, [domainPart]);

  const onSelectionChanged = (value) => {
    if (value === "__customDomain") {
      setCustomDomain(true);
      onChangeDomainPart("");
    } else {
      setCustomDomain(false);
      onChangeDomainPart(value);
    }
  };

  return (
    <div className="email-input">
      <input
        className="address-part"
        type="text"
        value={addressPart}
        onChange={(e) => onChangeAddressPart(e.target.value)}
      />
      <span className="at-symbol">@</span>
      <input
        className="custom-domain-input"
        type="text"
        value={domainPart}
        onChange={(e) => onChangeDomainPart(e.target.value)}
        disabled={!isCustomDomain}
      />
      <select
        className="domain-select"
        value={isCustomDomain ? "__customDomain" : domainPart}
        onChange={(e) => onSelectionChanged(e.target.value)}
      >
        {candidates.map((domain) => (
          <option className="domain-option" key={domain} value={domain}>
            {domain}
          </option>
        ))}
        <option
          className="custom-domain-option"
          key="__customDomain"
          value="__customDomain"
        >
          직접 입력
        </option>
      </select>
      <button
        type="button"
        className='check-button'
        onClick={onCheckEmail}
      >
        이메일 체크
      </button>
    </div>
  );
};

const UpdateUserForm = () => {
  const { axios, logout } = useAuth();
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
  // const isEmailUpdated = () => userInfo.email !== initialEmail;


  // 이메일 중복 체크
  const onCheckEmail = async () => {
    if (userInfo.email1 === null || userInfo.email2 === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    //const email = userInfo.email1 + '@' + userInfo.email2;
    const email = userInfo.email; //useEffect에서 계산된 값을 가져다가 쓰면 됨.
    const data = { email };

    if (email === initialEmail) {
      alert("현재 사용 중인 이메일입니다.");
      return;
    }

    try {
      const response = await getData(data);
      if (response.status === 200) {
        console.log('사용 가능한 이메일!');
        alert("사용 가능한 이메일입니다.");
        //setInputDisable({ ...inputDisable, isEmail: true });
      }
    } catch (error) {
      if (error.response.status === 409) {
        console.log('사용중인 이메일!', error);
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

  //회원 탈퇴
  const handleDeleteAccount = async () => {
    if (window.confirm('정말로 회원 탈퇴를 하시겠습니까?')) {
      try {
        const response = await axios.delete('/users/delete');
        if (response.status === 200) {
          alert('회원 탈퇴가 성공적으로 처리 되었습니다.');
          // sessionStorage.removeItem("member"); // 클라이언트 사이드에서의 추가 처리
          logout(false); // 로그아웃 처리. 사용자에게 묻지 않음.
        } else {
          alert('회원 탈퇴 중 오류가 발생했습니다.');
        }
      } catch (error) {
        alert('회원 탈퇴 중 오류가 발생했습니다.');
        console.error(error);
      }
    }
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
            <div class="email-input-outer">
              <EmailInput
                addressPart={userInfo.email1}
                domainPart={userInfo.email2}
                onChangeAddressPart={(s) => setUserInfo({ ...userInfo, email1: s })}
                onChangeDomainPart={(s) => setUserInfo({ ...userInfo, email2: s })}
                candidates={predefinedDomains}
                onCheckEmail={onCheckEmail}
              />
            </div>
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
            <button className="button" onClick={handleDeleteAccount}>회원 탈퇴하기</button>
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
