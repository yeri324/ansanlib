import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteUserForm = () => {
    const navigate = useNavigate();

    const handleDeleteAccount = () =>{
        if (window.confirm('정말로 회원 탈퇴를 하시겠습니까?')){
          axios.post('api/user/delete')
          .then(response =>{
            alert('회원 탈퇴가 성공적으로 처리 되었습니다.');
            sessionStorage.removeItem("member");
            navigate('/home');
          })
          .catch(error => {
            alert('회원 탈퇴중 오류가 발생했습니다.');
            console.error(error);
          });
        }
    }; 

    return(
        <div className="delete_form">
            <div className="title">
                <h2>회원 탈퇴</h2>
            </div>
            <p>회원 탈퇴를 원하시면 아래 버튼을 클릭해주세요.</p>
            <button onClick={handleDeleteAccount} className="delete_btn">회원 탈퇴</button>
        </div>
    );
     
}

export default DeleteUserForm;