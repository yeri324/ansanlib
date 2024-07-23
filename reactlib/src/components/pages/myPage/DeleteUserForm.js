import React from 'react';
import useAuth, { LOGIN_STATUS } from '../../hooks/useAuth';
import RedirectLogin from '../../helpers/RedirectLogin';
import Auth from '../../helpers/Auth';
import Footer from '../../fragments/footer/footer';
import '../../fragments/footer/footer.css';
import Header from '../../fragments/header/header';
import '../../fragments/header/header.css';
import './DeleteUserForm.css';

const DeleteUserForm = () => {
  const { axios, logout } = useAuth();

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
      <div className='mmypage-header'>
        <h2 className='mypage-header-name'>회원 탈퇴 페이지</h2>
      </div>
      <div className='delete_form'>  
      <button onClick={handleDeleteAccount}>회원 탈퇴하기</button>
      </div>
    </div>
  );
};

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
        <Header />
        <div className='Mypage-body'>
          <DeleteUserForm />
        </div>
        <Footer />
      </Auth>
    </>
  );
};
