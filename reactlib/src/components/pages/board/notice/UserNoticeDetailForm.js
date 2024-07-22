import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';
import ImgPreview from '../common/ImgPreview';
import BoardFileLabel from '../common/BoardFileLabel';
import '../../board/common/DetailForm.css'

function UserNoticeDetailForm({ id }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createdBy, setCreatedBy] = useState('');
    const [regDate, setRegDate] = useState();
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
            setTitle(res.data.title);
            setContent(res.data.content);
            setCreatedBy(res.data.modifiedBy);
            setRegDate(res.data.updateTime.split('T')[0]);
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
            <div class='board-detail-form'>
                <form>
                    <h2>공지사항</h2>
                    <div class='content-container1'>
                        <div class='input-container'>
                            <div class='bdetail-top'>
                                <p style={{ textAlign: 'left' }}>번호 : {id}</p>
                                <p>작성자 : {createdBy}</p>
                                <p style={{ textAlign: 'right' }}>작성일 : {regDate}</p>
                            </div>
                            <input type='text' name='title' value={title} readOnly />
                            <textarea type='text' name='content' value={content} readOnly />
                        </div>
                        <div class='img-container1'>
                            <div class='img-pre'>
                                {images.map(putImage => (
                                    <ImgPreview key={putImage.id} putImage={putImage} board='notice' />
                                ))}
                            </div>
                            <div class='file-uplo'>
                                {images.map(putImage => (
                                    <BoardFileLabel putImage={putImage} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={() => onGoBack()}>돌아가기</button>
                </form>
            </div >
        </div >
    );
};

export default UserNoticeDetailForm;