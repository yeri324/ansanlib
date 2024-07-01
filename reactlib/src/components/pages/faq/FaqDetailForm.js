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
    const [images, setImages] = useState([{ id: faqInfo.id, file: faqInfo.file }]);

    const updateTitle = e => setTitle(e.target.value);
    const updateContent = e => setContent(e.target.value);

    // 파일 수정
    const handleImgChange = (id, file) => {
        setImages(images.map(item => item.id === id ? { ...item, file } : item));
    };

    // 수정한 데이터 보내기
    const onUpdate = () => {
        if (window.confirm('수정 하시겠습니까?')) {

            const formData = new FormData();

            formData.append("title", updateTitle);
            formData.append("content", updateContent);
            images.forEach((image) => { if (image.file) formData.append('faqImgFile', image.file); });

            try {
                axios.put(
                    'http://localhost:8090/faq/detail',
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then(function (response) {
                    console.log(response.data);
                });
                navigate("/faq/list", { repalce: true });
            } catch (error) {
                console.error("There was an error uploading the data!", error);
            }
        }
    }

    //상세 페이지 내 게시글 삭제
    const onDelete = () => {
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
            window.location.reload(navigate("/faq/list", { repalce: true }));
        }
    }

    return (
        <div>
            <p>수정하기</p>
            <form>
                <input type='text' name='title' value={title} onChange={updateTitle} />
                <input type='text' name='content' value={content} onChange={updateContent} />
                {images.map(image => (
                    <div key={image.id}>
                        <input type="file" onChange={(e) => handleImgChange(image.id, e.target.files[0])} />
                    </div>
                ))}
                {images.length < 5 && <button type="button" >이미지변경</button>}
                <button onClick={() => onUpdate()}>수정</button>
                <button onClick={() => onDelete()}>삭제</button>
            </form>
        </div>
    );
};

export default FaqDetailForm;