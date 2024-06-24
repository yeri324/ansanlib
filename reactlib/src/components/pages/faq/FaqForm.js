import './FaqForm.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function FaqForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isTitleClicked, setIsTitleClicked] = useState(false);
  const [isContentClicked, setIsContentClicked] = useState(false);

  const writeTitle = e => setTitle(e.target.value);
  const writeContent = e => setContent(e.target.value);

  function Send() {
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
        <button onClick={() => Send()}>저장</button>
      </form>
    </div>
  );
};

export default FaqForm;