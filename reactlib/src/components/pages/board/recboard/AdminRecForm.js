import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';
import SearchModal from './SearchModal';
import './RecForm.css';
import AdminHeader from '../../admin/common/AdminHeader';
import AdminSide from '../../admin/common/AdminSide';

function AdminRecForm() {
  const { axios } = useAuth();
  const navigate = useNavigate();
  const [isTitleClicked, setIsTitleClicked] = useState(false);
  const [isContentClicked, setIsContentClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectBook, setSelectBook] = useState({});
  const [recData, setRecData] = useState({
    title: '',
    content: '',
  });

  // 제목/내용 저장
  const onInputChange = (e) => {
    setRecData({ ...recData, [e.target.name]: e.target.value });
  };

  // 글생성
  const onCreate = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    axios({
      url: '/admin/recboard/new',
      method: 'post',
      data: {
        title: recData.title,
        content: recData.content,
        bookId: selectBook.id,
      },
      baseURL: 'http://localhost:8090',
    })
      .then((res) => {
        console.log(res.data);
        alert('등록되었습니다.');
        navigate("/admin/recboard/list", { replace: true });
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          // Handle conflict error (duplicate entry)
          alert('이미 등록된 도서입니다.');
        } else {
          console.error('Error creating record:', error);
          alert('등록 중 오류가 발생했습니다.');
        }
      });
  };

  // 도서 검색
  const searchHandle = () => {
    setIsOpen(!isOpen);
  };

  

  return (
    <div className="admin-page">
      <div className="admin-base">
        <AdminHeader />
        <AdminSide />
      </div>
      <main className="admin-page-main">
        <div className="admin-page-body popupPage">
          <div className="admin-page-title">
            <h1>추천 게시글 작성</h1>
          </div>
          <div className='rec-form'>
            <div className='reccreate-form'>
              <form onSubmit={onCreate}>
                <div className='all-item'>
                  <div className="content-item">
                    <input id='title' type='text' name='title'
                      placeholder={isTitleClicked === true ? "" : "제목을 작성해주세요."}
                      onFocus={() => { setIsTitleClicked(true); }}
                      onBlur={() => { setIsTitleClicked(false); }}
                      onChange={onInputChange} />
                    <textarea id='content' name='content'
                      placeholder={isContentClicked === true ? "" : "내용을 작성해주세요."}
                      onFocus={() => { setIsContentClicked(true); }}
                      onBlur={() => { setIsContentClicked(false); }}
                      onChange={onInputChange} />
                  </div>
                  <div className='book-info'>
                    <div className='leftside'>
                      <input type='text' name='book-title' value={selectBook.title} readOnly />
                      <input type='text' name='book-author' value={selectBook.author} readOnly />
                    </div>
                    <div className='rightside'>
                      <button type='button' className='btn btn-outline-dark' onClick={searchHandle}>도서 검색</button>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-outline-dark'>저장</button>
                </div>
              </form>
              <div className='admin-page-button'>
                <button className='btn btn-outline-dark' onClick={() => navigate('/admin/recboard/list')}>돌아가기</button>
              </div>
            </div>
            <div>
              {isOpen &&
                <SearchModal setIsOpen={setIsOpen} setSelectBook={setSelectBook} />
              }
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <AdminRecForm />
      </Auth>
    </>
  );
};
