import usePagination from '@mui/material/usePagination/usePagination';
import './FaqForm.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const FaqForm = ()=> {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isTitleClicked, setIsTitleClicked] = useState(false);
  const [isContentClicked, setIsContentClicked] = useState(false);

  const writeTitle = e => setTitle(e.target.value);
  const writeContent = e => setContent(e.target.value);


  //파일 업로드
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  }

 
  const uploadFiles = () => {
    const formData = new FormData();

    files.map((file) => {
      formData.append("files", file);
    });
    console.log(formData);
    // axios(
    //   {
    //     url: '/faq/uploads',
    //     method: 'post',
    //     data: {
    //       formData: formData,
    //     },
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     baseURL: 'http://localhost:8090',
    //   });
  };

  // 생성 정보 보내기
  const Send = () => {
    
    axios(
      {
        url: '/faq/new',
        method: 'post',
        data: {
          title: title,
          content: content
        },
        baseURL: 'http://localhost:8090',
      }
    ).then(function (response) {
      console.log(response.data);
    });
    navigate("/faq/list", { repalce: true });
  }

  return (
    <div>
      <p>글 등록하기</p>
      <form>
        <input
          onFocus={() => { setIsTitleClicked(true); }}
          onBlur={() => { setIsTitleClicked(false); }}
          placeholder={isTitleClicked === true ? "" : "제목을 작성해주세요."}
          onChange={writeTitle} />
        <br />
        <input
          onFocus={() => { setIsContentClicked(true); }}
          onBlur={() => { setIsContentClicked(false); }}
          placeholder={isContentClicked === true ? "" : "내용을 작성해주세요."}
          onChange={writeContent} />
        <br />
        <button onClick={() => uploadFiles()}>저장</button>
        <input
          className='file-input'
          type="file"
          mulitple
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
};

export default FaqForm;