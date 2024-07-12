import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import ImgPreview from '../common/ImgPreview';
import BoardFileLabel from '../common/BoardFileLabel';
import '../../board/common/DetailForm.css'

function UserNoticeDetailForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        getDataset();
    }, []);


    // 게시글 가져오기
    const getDataset = async () => {
        axios(
            {
                url: '/notice/detail',
                method: 'post',
                data: {
                    id: id,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((res) => {
            console.log(res.data);
            setTitle(res.data.title);
            setContent(res.data.content);
            setImages(res.data.noticeImgs);
        }
        )
    }

    //목록으로가기
    const onGoBack = () => {
        navigate('/user/notice/list', { replace: true });
    };

    return (
        <div>
            <div class='update-form'>
                <form>
                    <div class='content-container'>
                        <div class='input-container'>
                            <input type='text' name='title' value={title} readOnly/>
                            <textarea type='text' name='content' value={content} readOnly />
                        </div>
                        <div class='img-container'>
                            {images.map(putImage => (
                                <ImgPreview key={putImage.id} putImage={putImage} board='notice' />
                            ))}
                            {images.map(putImage => (
                                <BoardFileLabel putImage={putImage}/>
                            ))}
                        </div>
                        <button type="button" onClick={() => onGoBack()}>돌아가기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserNoticeDetailForm;