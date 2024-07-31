import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../board/common/Form.css'
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';
import AdminHeader from '../../admin/common/AdminHeader';
import AdminSide from '../../admin/common/AdminSide';

function AdminNoticeForm() {
  const { axios } = useAuth();
  const navigate = useNavigate();
  const [isTitleClicked, setIsTitleClicked] = useState(false);
  const [isContentClicked, setIsContentClicked] = useState(false);
  const [images, setImages] = useState([{ id: 1, file: null }]);
  const [count, setCount] = useState(1);
  const [noticeData, setNoticeData] = useState({
    title: '',
    content: ''
  });

  // 파일 업로드
  const handleImgChange = (id, file) => {
    setImages(images.map(item => item.id === id ? { ...item, file } : item));
  };

  // 이미지추가버튼
  const handleAddImg = () => {
    if (images.length < 5) {
      setImages([...images, { id: count + 1, file: null }]);
      setCount(count + 1);
    }
  };

  // 제목/내용 저장
  const onInputChange = (e) => {
    setNoticeData({ ...noticeData, [e.target.name]: e.target.value });
  };

  // 생성 정보 보내기
  const onCreate = (e) => {
    if (noticeData.title != null && noticeData.title != '' && noticeData.content != null && noticeData.content != '') {
      e.preventDefault();
      const formData = new FormData();

      formData.append("title", noticeData.title);
      formData.append("content", noticeData.content);
      images.forEach((image) => { if (image.file) formData.append('noticeImgFile', image.file); });

      try {
        axios.post(
          'http://localhost:8090/admin/notice/new',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        window.location.reload(navigate("/admin/notice/list", { replace: true }));
      } catch (error) {
        console.error("There was an error uploading the data!", error);
      }
    } else {
      alert("제목과 내용은 필수사항입니다.");
    }
  };

  // 이미지 삭제 버튼
  const onImgDelete = (e) => {
    const filteredItems = images.filter(item => item !== e);
    setImages(filteredItems)
  }

  return (
    <div className="admin-page">
      <div className="admin-base">
        <AdminHeader />
        <AdminSide />
      </div>
      <main className="admin-page-main">
        <div className="admin-page-body">
          <div class="create-form">
          <div className="admin-page-title">
            <h2>공지사항 등록</h2>
          </div>
            <form class='form-list'>
              <div class="content-item">
                <input
                  id='title'
                  type='text'
                  name='title'
                  placeholder={isTitleClicked === true ? "" : "제목을 작성해주세요."}
                  onFocus={() => { setIsTitleClicked(true); }}
                  onBlur={() => { setIsTitleClicked(false); }}
                  onChange={onInputChange} />

                <textarea
                  id='content'
                  name='content'
                  placeholder={isContentClicked === true ? "" : "내용을 작성해주세요."}
                  onFocus={() => { setIsContentClicked(true); }}
                  onBlur={() => { setIsContentClicked(false); }}
                  onChange={onInputChange} />

                {images.map(image => (
                  <div key={image.id}>
                    <input type="file" onChange={(e) => handleImgChange(image.id, e.target.files[0])} />
                    <button type='button' onClick={(e) => onImgDelete(image)}>삭제</button>
                  </div>
                ))}
              </div>
              {images.length < 5 && <button type="button" onClick={handleAddImg}>이미지추가</button>}
              <button type='button' onClick={onCreate}>저장</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <AdminNoticeForm />
      </Auth>
    </>
  );
};