import React, { useState, useEffect } from 'react';
import useAuth, { LOGIN_STATUS } from '../../hooks/useAuth';
import RedirectLogin from '../../helpers/RedirectLogin';
import Auth from '../../helpers/Auth';
import { info, update } from '../security/apis/auth';
import Header from '../../fragments/header/header';
import Footer from '../../fragments/footer/footer';
import Side from './Side';
import './UpdateUserForm.css';

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
    <div class="update_form">
    <h2 class="form_title">회원 정보 수정</h2>
    <form onSubmit={handleSubmit}>
      <div class="form_section">
        <h3 class="section_title">기본 정보 입력</h3>
        <p class="required_notice">*은 필수 입력 사항입니다.</p>
        
        <div class="form_group">
          <label htmlFor="name">* 이름</label>
          <input type="text" id="name" name="name" value={userInfo.name} onChange={handleChange} />
        </div>
        
        <div class="form_group">
          <label htmlFor="phone">* 휴대폰 번호</label>
          <input type="text" id="phone" name="phone" maxLength="13" value={userInfo.phone} onChange={handleChange} />
        </div>
        
        <div class="form_group">
          <label htmlFor="email">* 이메일</label>
          <input type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} />
        </div>
        
        <div class="form_group address_group">
          <label htmlFor="address">* 주소</label>
          <div class="address_container">
            <input type="text" id="address" name="address" value={userInfo.address} readOnly className="address_display" />
            <button className="address_btn" type="button">우편번호 조회</button>
          </div>
        </div>
        
        <div class="form_group">
          <label htmlFor="address2">* 상세주소</label>
          <input type="text" id="address2" name="address2" value={userInfo.address2} onChange={handleChange} placeholder="상세주소 입력" />
        </div>
        
        <div class="form_group sms_agreement">
          <label> * 문자수신동의</label>
          <div className="radio_group">
            <input type="radio" id="sms_yes" name="sms" value="yes" checked={userInfo.sms === 'yes'} onChange={handleChange} />
            <label htmlFor="sms_yes">동의</label>
            <input type="radio" id="sms_no" name="sms" value="no" checked={userInfo.sms === 'no'} onChange={handleChange} />
            <label htmlFor="sms_no">비동의</label>
          </div>
        </div>
        
        <button type="submit" id="update_btn">정보 수정하기</button>
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
        <UpdateUserForm />
        <Side />
        <Footer/>
      </Auth>
    </>
  );
};
