import './FaqDetailForm.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function FaqDetailForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [faqDetail, setFaqDetail] = useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const location = useLocation();
    const faqInfo = {...location.state};

    const updateTitle = e => setTitle(e.target.value);
    const updateContent = e => setContent(e.target.value);

    useEffect(() => {
        getDataset();
    }, []);

    const getDataset = () => {
        axios.get(`/faq/detail/${id}`)
            .then((res) => {

                setFaqDetail(res.data);
            })
            .catch((err) => {
                setFaqDetail([]);
            });
    };

    function Send() {
        axios(
            {
                url: `/faq/detail/${id}`,
                method: 'put',
                data: {
                    id : id,
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

    return (
        <div>
            <p>수정하기</p>
            <form>
            <textarea onChange={updateTitle}>{faqInfo.title}</textarea>
            <br/>
            <textarea onChange={updateContent}>{faqInfo.content}</textarea>
            <br/>
            <button onClick={() => Send()}>수정</button>
            </form>
        </div>
    );
};

export default FaqDetailForm;