import React, { useState, useEffect, } from 'react';
import { useNavigate, } from 'react-router-dom';
import '../../board/common/DetailForm.css'
import BoardImgList from '../common/BoardImgList';
import useAuth from '../../../hooks/useAuth';
import AdminHeader from '../../admin/common/AdminHeader';
import AdminSide from '../../admin/common/AdminSide';

function AdminFaqDetailForm({ id, }) {
    const { axios } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [createdBy, setCreatedBy] = useState('');
    const [regDate, setRegDate] = useState();
    const [images, setImages] = useState([]);
    const [count, setCount] = useState(1);
    const [deleteImg, setDeleteImg] = useState([]);
    const [viewCount, setViewCount] = useState();

    useEffect(() => {
        getDataset();
    }, []);

    // 수정 제목, 내용
    const updateTitle = (e) => { setTitle(e.target.value) };
    const updateContent = (e) => { setContent(e.target.value) };

    // 게시글 가져오기
    const getDataset = async () => {
        await axios(
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
        }
        )
    }

    // 파일 수정
    const handleImgChange = (id, file) => {
        setImages(images.map(item => item.id === id ? { ...item, file } : item));
    };

    // 파일 추가
    const handleAddImg = () => {
        if (images.length < 5) {
            setImages([...images, { id: 'a' + count, file: null }]);
            setCount(count + 1)
        }
    };

    // 수정한 데이터 보내기
    const onUpdate = () => {
        if (window.confirm('수정 하시겠습니까?')) {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("title", title);
            formData.append("content", content);
            images.forEach((image) => {
                if (image.file) {
                    formData.append('faqImgFileId', image.id)
                    formData.append('faqImgFile', image.file);
                }

            });

            deleteImg.forEach((item) => {
                formData.append('delImg', item);
            });
            try {
                axios.put(
                    'http://localhost:8090/admin/faq/update',
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                )
                window.location.reload(navigate("/admin/faq/list", { replace: true }));
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
                    url: '/admin/faq/delete',
                    method: 'delete',
                    data: {
                        id: id,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/admin/faq/list", { repalce: true },));
        }
    }

    // 이미지 삭제
    const onImgDelete = (e) => {
        const filteredItems = images.filter(item => item !== e);
        setImages(filteredItems)
        if (typeof (e.id) === 'number') {
            setDeleteImg([...deleteImg, e.id])
        }
    }

    //목록으로가기
    const onGoBack = () => {
        navigate('/admin/faq/list', { replace: true });
    };

    return (
        <div className="admin-page">
            <div className="admin-base">
                <AdminHeader />
                <AdminSide />
            </div>
            <main className="admin-page-main">
                <div className="admin-page-body">
                    <div class='board-detail-form'>
                        <form>
                        <div className="admin-page-title">
                            <h2>FAQ</h2>
                        </div>
                            <div class='content-container1'>
                                <div class='input-container'>
                                    <table class='b-inputtable'>
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
                                                <input type='text' name='title' value={title} onChange={updateTitle} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan='4'>
                                                <textarea type='text' name='content' value={content} onChange={updateContent} />
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <BoardImgList images={images} handleImgChange={handleImgChange} onImgDelete={onImgDelete} />
                            </div>
                            {images.length < 5 && <button type="button" onClick={handleAddImg}>이미지추가</button>}
                            <button type='button' onClick={() => onUpdate()} >수정</button>
                            <button type="button" onClick={() => onDelete()}>삭제</button>
                            <button type="button" onClick={() => onGoBack()}>돌아가기</button>
                        </form>
                    </div >
                </div >
            </main>
        </div>
    );
};

export default AdminFaqDetailForm;
