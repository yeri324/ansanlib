import './FaqDetailForm.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ImgPreview from './ImgPreview';
import FaqFileLabel from './FaqFileLabel';

function FaqDetailForm() {
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
                url: '/faq/detail',
                method: 'post',
                data: {
                    id: id,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((res)=>{
            console.log(res.data);
            setTitle(res.data.title);
            setContent(res.data.content);
            setImages(res.data.faqImgs);
        }
    )}
       

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
                    formData.append('faqImgFileId', image.id)
                    formData.append('faqImgFile', image.file);
                }
            });
            if (formData.get("faqImgFile") === null) console.log("널!");
            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }
            try {
                axios.put(
                    'http://localhost:8090/faq/update',
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then(function (response) {
                    console.log(response.data);
                });
                window.location.reload(navigate("/faq/list", { replace: true }));
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
                    url: '/faq/delete',
                    method: 'delete',
                    data: {
                        id: id,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/faq/list", { repalce: true }, ));
        }
    }

    // 이미지 삭제
    const onImgDelete = (e) => {
        console.log(e);
        axios(
            {
                url: '/faq/imgDelete',
                method: 'delete',
                data: {
                    id: e.id,
                },
                baseURL: 'http://localhost:8090',
            }
        )
        window.location.reload(navigate(`/faq/detail/${id}`, { repalce: true }));
    }

    return (
        <div>
            <p>수정하기</p>
            <form>
                <input type='text' name='title' value={title} onChange={updateTitle} />
                <input type='text' name='content' value={content} onChange={updateContent} />

                {images.map(putImage => (
                    <div>
                        {
                             <FaqFileLabel putImage={putImage} handleImgChange={handleImgChange} onImgDelete={onImgDelete}/>
                            // <div key={putImage.id}>
                            //     <input type="file" onChange={(e) => handleImgChange(putImage.id, e.target.files[0])} />
                            //     <input type='hidden' value={putImage.id} />
                            //     <label>{putImage.file == null ? putImage.oriImgName : putImage.file.name}</label>
                            //     <button value={putImage.id} onClick={(e) => onImgDelete()}>이미지 삭제</button>
                            // </div>
                        }
                    </div>          
                ))} 
                
                {images.map(putImage => (
                    <ImgPreview key={putImage.id} faq={putImage} />
                ))}
                {images.length < 5 && <button type="button" onClick={handleAddImg}>이미지추가</button>}
                <button type='submit' onClick={() => onUpdate()} >수정</button>
                <button onClick={() => onDelete()}>삭제</button>
            </form>

        </div>
    );
};

export default FaqDetailForm;