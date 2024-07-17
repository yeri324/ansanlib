import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';
import SearchModal from './SearchModal';

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
  })

  // 제목/내용 저장
  const onInputChange = (e) => {
    setRecData({ ...recData, [e.target.name]: e.target.value });
  };

  // 글생성
  const onCreate = () => {
    axios(
      {
        url: '/admin/recboard/new',
        method: 'post',
        data: {
          title: recData.title,
          content: recData.content,
          bookId: selectBook.id,
        },
        baseURL: 'http://localhost:8090',
      }
    ).then((res) => {
      console.log(res.data);
    }
    )
    window.location.reload(navigate("/admin/recboard/list", { replace: true }));
  }

  // 도서 검색
  const searchHandle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div class='rec-form'>
      <form onSubmit={onCreate}>
        <h3>글 등록하기</h3>
        <div class="content-item">
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
        <div class='book-info'>
          <input type='text' name='book-title' value={selectBook.title} readOnly />
          <input type='text' name='book-author' value={selectBook.author} readOnly />
        </div>
        <button type='button' onClick={searchHandle}>도서 검색</button>
        <button type='submit'>저장</button>
      </form>
      <div>
        {isOpen &&
          <SearchModal setIsOpen={setIsOpen} setSelectBook={setSelectBook} />
        }
      </div>
    </div>
  );
}

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN} >
        <AdminRecForm />
      </Auth>
    </>
  );
};