// import './BoardDetailForm.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import ImgPreview from './ImgPreview';
import BoardFileLabel from './BoardFileLabel';

function BoardDetailForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        getDataset();
    }, []);

    // 수정 제목, 내용
    const updateTitle = (e) => { setTitle(e.target.value) };
    const updateContent = (e) => { setContent(e.target.value) };

    // 게시글 가져오기
    const getDataset = async () => {
        axios(
            {
                url: '/board/detail',
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
            setImages(res.data.BoardImgs);
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
            setImages([...images, { id: images.length + 1, file: null }]);
        }
    };

    // 수정한 데이터 보내기
    const onUpdate = (e) => {
        if (window.confirm('수정 하시겠습니까?')) {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("title", title);
            formData.append("content", content);
            images.forEach((image) => {
                if (image.file) {
                    formData.append('boardImgFileId', image.id)
                    formData.append('boardImgFile', image.file);
                }
            });
            if (formData.get("boardImgFile") === null) console.log("널!");
            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }
            try {
                axios.put(
                    'http://localhost:8090/board/update',
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then(function (response) {
                    console.log(response.data);
                });
                window.location.reload(navigate("/board/list", { replace: true }));
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
                    url: '/board/delete',
                    method: 'delete',
                    data: {
                        id: id,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/board/list", { repalce: true },));
        }
    }

    // 이미지 삭제
    const onImgDelete = (e) => {
        console.log(e);
        axios(
            {
                url: '/board/imgDelete',
                method: 'delete',
                data: {
                    id: e.id,
                },
                baseURL: 'http://localhost:8090',
            }
        )
        window.location.reload(navigate(`/board/detail/${id}`, { repalce: true }));
    }

    //목록으로가기
    const onGoBack = () => {
        navigate('/board/list', { replace: true });
    };

    return (
        <div>
            <p>수정하기</p>
            <form>
                <input type='text' name='title' value={title} onChange={updateTitle} />
                <input type='text' name='content' value={content} onChange={updateContent} />

                {images.map(putImage => (
                    <div>
                        {
                            <BoardFileLabel putImage={putImage} handleImgChange={handleImgChange} onImgDelete={onImgDelete} />
                        }
                    </div>
                ))}
                {images.map(putImage => (
                    <ImgPreview key={putImage.id} Board={putImage} />
                ))}
                {images.length < 5 && <button type="button" onClick={handleAddImg}>이미지추가</button>}
                <button type='submit' onClick={() => onUpdate()} >수정</button>
                <button onClick={() => onDelete()}>삭제</button>
                <button onClick={() => onGoBack()}>돌아가기</button>
            </form>
        </div>
    );
};

export default BoardDetailForm;