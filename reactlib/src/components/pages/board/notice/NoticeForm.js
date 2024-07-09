import axios from 'axios';
import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../board/Form.css'

function NoticeForm() {
  const navigate = useNavigate();
  const [isTitleClicked, setIsTitleClicked] = useState(false);
  const [isContentClicked, setIsContentClicked] = useState(false);
  const [images, setImages] = useState([{ id: 1, file: null }]);
  const [noticeData, setNoticeData] = useState({
    title: '',
    content: ''
  });

  // 파일 업로드
  const handleImgChange = (id, file) => {
    setImages(images.map(item => item.id === id ? { ...item, file } : item));
  };

  //이미지추가버튼
  const handleAddImg = () => {
    if (images.length < 5) {
      setImages([...images, { id: images.length + 1, file: null }]);
    }
  };

  // 제목/내용 저장
  const onInputChange = (e) => {
    setNoticeData({ ...noticeData, [e.target.name]: e.target.value });
  };

  // 생성 정보 보내기
  const onCreate = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", noticeData.title);
    formData.append("content", noticeData.content);
    images.forEach((image) => { if (image.file) formData.append('noticeImgFile', image.file); });

    try {
      axios.post(
        'http://localhost:8090/notice/new',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      window.location.reload(navigate("/notice/list", { replace: true }));
    } catch (error) {
      console.error("There was an error uploading the data!", error);
    }

  };

  return (
    <div>
      <div class="create-form">
        <form onSubmit={onCreate}>
          <h3>글 등록하기</h3>
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
              </div>
            ))}
          </div>
          {images.length < 5 && <button type="button" onClick={handleAddImg}>이미지추가</button>}
          <button type='submit'>저장</button>
        </form>
      </div>
    </div>
  );
};

export default NoticeForm;