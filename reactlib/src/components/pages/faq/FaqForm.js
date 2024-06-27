import './FaqForm.css';
import axios from 'axios';
import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';

const FaqForm = () => {
  const navigate = useNavigate();
  const [isTitleClicked, setIsTitleClicked] = useState(false);
  const [isContentClicked, setIsContentClicked] = useState(false);
  const [faqData, setFaqData] = useState({
    title: '',
    content: ''
  });

  const onInputChange = (e) => {
    setFaqData({ ...faqData, [e.target.name]: e.target.value });
  };

  // 파일 업로드
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 생성 정보 보내기
  const onCreate = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", faqData.title);
    formData.append("content", faqData.content);
    formData.append("faqImgFile", file);

    try { 
      axios.post(
        'http://localhost:8090/faq/new', 
        formData, 
        {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate("/faq/list", { replace: true });
    } catch (error) {
      console.error("There was an error uploading the data!", error);
    }

  };

  return (
    <div>
      <p>글 등록하기</p>
      <form onSubmit={onCreate}>
        <input
          type='text'
          name='title'
          value={faqData.title}
          placeholder={isTitleClicked === true ? "" : "제목을 작성해주세요."}
          onFocus={() => { setIsTitleClicked(true); }}
          onBlur={() => { setIsTitleClicked(false); }}
          onChange={onInputChange} />

        <input
          type='text'
          name='content'
          value={faqData.content}
          placeholder={isContentClicked === true ? "" : "내용을 작성해주세요."}
          onFocus={() => { setIsContentClicked(true); }}
          onBlur={() => { setIsContentClicked(false); }}
          onChange={onInputChange} />

        <input
          className='file-input' type="file" accept="image/*" onChange={handleFileChange}
        />
        <button type='submit'>저장</button>
      </form>
    </div>
  );
};

export default FaqForm;