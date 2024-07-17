import React, { useState, useEffect } from 'react';
import useAuth, { LOGIN_STATUS } from '../../hooks/useAuth';
import RedirectLogin from '../../helpers/RedirectLogin';
import Auth from '../../helpers/Auth';
import { info, update } from '../security/apis/auth';
import Header from '../../fragments/header/header';
import Footer from '../../fragments/footer/footer';
import Side from './Side';

const UpdateUserForm = () => {
  const { axios } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    sms: false,
    gender: ''
  });

  const initData = async () => {
    const initialUserInfo = (await info()).data;
    setUserInfo({
      name: initialUserInfo?.name ?? '',
      email: initialUserInfo?.email ?? '',
      phone: initialUserInfo?.phone ?? '',
      address: initialUserInfo?.address ?? '',
      address2: initialUserInfo?.address2 ?? '',
      sms: initialUserInfo?.sms ?? '',
      gender: initialUserInfo?.gender ?? ''
    });
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
              <label htmlFor="name">* 이름</label>
              <input name="name" value={userInfo.name} onChange={handleChange} /> <br/>

              <label htmlFor="phone">* 휴대폰 번호</label>
              <input type="text" name="phone" maxLength="13" value={userInfo.phone} onChange={handleChange} /><br/>

              <label htmlFor="email">* 이메일</label>
              <input className='email' name="email" value={userInfo.email} onChange={handleChange} /><br/>

              <label>* 주소</label>
              <div>
                <div className='zonecode_view'>{userInfo.address}</div>
                <button className='address_btn' type="button">우편번호 조회</button>
              </div><br/>

              <label>* 상세주소</label>
              <input name="address2" value={userInfo.address2} onChange={handleChange} placeholder="상세주소 입력" /><br/>

              <label>* 문자수신동의</label>
              <div>
                <input type="radio" name="sms" id="sms_yes" value="yes" checked={userInfo.sms === 'yes'} onChange={handleChange} />
                <label htmlFor="sms_yes">동의</label>
                <input type="radio" name="sms" id="sms_no" value="no" checked={userInfo.sms === 'no'} onChange={handleChange} />
                <label htmlFor="sms_no">비동의</label><br/>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" id="update_btn">정보 수정하기</button>
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
        <UpdateUserForm />
        <Side />
        <Footer/>
      </Auth>
    </>
  );
};
