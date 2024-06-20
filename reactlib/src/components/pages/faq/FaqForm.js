import './FaqForm.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function FaqForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const writeTitle = e => setTitle(e.target.value);
    const writeContent = e => setContent(e.target.value);

    function Send() {
        axios(
            {
              url: '/faq/new',
              method: 'post',
              data: {
                title:title,
                content:content
              }, 
              baseURL: 'http://localhost:8090',
            }
          ).then(function (response) {
            console.log(response.data);
          });
          navigate("/faq/list",{repalce:true});
    }

    return (
        <div>
            <p>글 등록하기</p>
            <input onChange={writeTitle} />
            <input onChange={writeContent} />
            <button onClick={()=> Send()}>저장</button>
        </div>
    );
};

export default FaqForm;