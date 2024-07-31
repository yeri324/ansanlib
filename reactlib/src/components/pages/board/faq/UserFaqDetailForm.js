import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, } from 'react-router-dom';
import BoardFileLabel from '../common/BoardFileLabel';
import ImgPreview from '../common/ImgPreview';
import '../../board/common/DetailForm.css'

function UserFaqDetailForm({ id }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createdBy, setCreatedBy] = useState('');
    const [regDate, setRegDate] = useState();
    const [images, setImages] = useState([]);
    const [viewCount, setViewCount] = useState();

    useEffect(() => {
        getDataset();
        getCountView();
    }, []);

    // 게시글+현재 조회수 가져오기
    const getDataset = async () => {
        axios(
            {
                url: '/faq/detail',
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
            setViewCount(res.data.count);
            setImages(res.data.faqImgs);
        })
    };

    // 조회 수 카운트 (세기)
    const getCountView = async () => {
        try {
            axios(
                {
                    url: '/faq/count',
                    method: 'post',
                    data: {
                        id: id,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    //목록으로가기
    const onGoBack = () => {
        navigate('/user/faq/list', { replace: true });
    };

    return (
        <div class='user-board-detail'>
            <div class='board-detail-form'>
                <form>
                    <div className="admin-page-title">
                        <h2>FAQ</h2>
                    </div>
                    <div class='content-container1'>
                        <div class='input-container'>
                            <table class='userb-inputtable'>
                                <tr>
                                    <th scope='row'>글 번호</th>
                                    <td>{id}</td>
                                    <th scope='row'>조회 수</th>
                                    <td>{viewCount}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>작성자</th>
                                    <td>{createdBy}</td>
                                    <th scope='row'>작성일</th>
                                    <td>{regDate}</td>
                                </tr>
                                <tr>
                                    <th scope='row'>제목</th>
                                    <td colSpan="3">
                                        <input type='text' name='title' value={title} readOnly />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan='4'>
                                        <textarea type='text' name='content' value={content} readOnly />
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class='img-container1'>
                            <div class='uimg-pre'>
                                {images.map(putImage => (
                                    <ImgPreview key={putImage.id} putImage={putImage} board="faq" />
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

export default UserFaqDetailForm;