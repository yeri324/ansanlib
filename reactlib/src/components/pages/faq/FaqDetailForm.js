import './FaqDetailForm.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function FaqDetailForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const faqInfo = { ...location.state };
    const { id } = useParams();
    const [title, setTitle] = useState(faqInfo.title);
    const [content, setContent] = useState(faqInfo.content);

    const updateTitle = e => setTitle(e.target.value);
    const updateContent = e => setContent(e.target.value);

    // 수정한 데이터 보내기
    function Send() {
        if (window.confirm('수정 하시겠습니까?')) {
            axios(
                {
                    url: `/faq/detail/${id}`,
                    method: 'put',
                    data: {
                        id: id,
                        title: title,
                        content: content,
                    },
                    baseURL: 'http://localhost:8090',
                }
            ).then(function (response) {
                console.log(response.data);
            });
            navigate("/faq/list", { repalce: true });
        }
    }

    //상세 페이지 내 게시글 삭제
    function Delete() {
        if (window.confirm('삭제 하시겠습니까?')) {
            axios(
                {
                    url: `/faq/delete`,
                    method: 'DELETE',
                    data: {
                        id: id,
                    },
                    baseURL: 'http://localhost:8090',
                }
            ).then(function (response) {
                console.log(response.data);
            });
            navigate("/faq/list", { repalce: true });
        }
    }

    return (
        <div>
            <p>수정하기</p>
            <form>
                <textarea onChange={updateTitle}>{title}</textarea>
                <br />
                <textarea onChange={updateContent}>{content}</textarea>
                <br />
                <button onClick={() => Send()}>수정</button>
                <button onClick={() => Delete()}>삭제</button>
            </form>
        </div>
    );
};

export default FaqDetailForm;