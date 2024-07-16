import React, { useState, useEffect, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImgPreview from '../common/ImgPreview';
import '../../board/common/AdminForm.css';
import BoardImgList from '../common/BoardImgList';
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import AdminHeader from '../../admin/AdminHeader';
import AdminSide from '../../admin/AdminSide';

function AdminNoticeDetailForm({id}) {
    const { axios } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]);
    const [count, setCount] = useState(1);
    const [deleteImg,setDeleteImg] = useState([])
    const { loginStatus, roles } = useAuth();
    

    //권한 여부 확인
    useEffect(() => {
        //로그아웃됨.
        if (loginStatus === LOGIN_STATUS.LOGGED_OUT) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        } else if (loginStatus === LOGIN_STATUS.LOGGED_IN) {
            //어드민인지 확인
            if (roles !== ROLES.ADMIN) {
                alert("권한이 없습니다.");
                navigate(-1);
            }
        }
        getDataset();
    }, [loginStatus]); //로그인 상태 변경시 useEffect 실행


    // 수정 제목, 내용
    const updateTitle = (e) => { setTitle(e.target.value) };
    const updateContent = (e) => { setContent(e.target.value) };

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

    // 파일 수정
    const handleImgChange = (id, file) => {
        setImages(images.map(item => item.id === id ? { ...item, file } : item));
    };

    // 파일 추가
    const handleAddImg = () => {
        if (images.length < 5) {
            setImages([...images, { id: 'a'+count, file: null }]);
            console.log('a'+count);
            setCount(count+1)
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
                    formData.append('noticeImgFileId', image.id)
                    formData.append('noticeImgFile', image.file);
                }
            });
            deleteImg.forEach((item) => {
                formData.append('delImg', item);
        });
            try {
                axios.put(
                    'http://localhost:8090/admin/notice/update',
                    formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                )
                window.location.reload(navigate("/admin/notice/list", { replace: true }));
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
                    url: '/admin/notice/delete',
                    method: 'delete',
                    data: {
                        id: id,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/admin/notice/list", { repalce: true },));
        }
    }

    // 이미지 삭제
    const onImgDelete = (e) => {
        const filteredItems = images.filter(item => item !== e);
        setImages(filteredItems)
        if(typeof(e.id)==='number'){
        setDeleteImg([...deleteImg,e.id])
    }
}

    //목록으로가기
    const onGoBack = () => {
        navigate('/admin/notice/list', { replace: true });
    };

    return (
        <div className="admin-page">
        <div className="admin-base">
          <AdminHeader />
          <AdminSide />
        </div>
  
        <main className="admin-page-main">
          <div className="admin-page-body">
            <div className="admin-page-title">
              <h1>NOTICE 수정</h1>
            </div>
            <div className='admin-detail-form'>
                <form className="admin-board-form">
                   
                    <div className='admin-content-container'>


                        <div className='admin-input-container'>


                            <div className='admin-input-title'>
                            <label className='admin-board-label'>제목</label>
                            <input type='text' name='title' value={title} onChange={updateTitle} />
                            </div>


                            <div className='admin-input-textarea'>
                            <label className='admin-board-label'>내용</label>
                             <textarea type='text' name='content' value={content} onChange={updateContent} />
                        </div>


                       

                        
                       <div className='admin-input-img'>
                         <BoardImgList images = {images} ImgPreview={ImgPreview} handleImgChange={handleImgChange} onImgDelete={onImgDelete} />
                        {images.length < 5 && <button type="button" onClick={handleAddImg}>이미지추가</button>}
                        </div>
                        </div>
                        <div className="admin-board-button">
                        <button type="button" className="btn btn-outline-dark" onClick={() => onUpdate()} >수정</button>
                        <button type="button" className="btn btn-outline-dark" onClick={() => onDelete()}>삭제</button>
                        <button type="button" className="btn btn-outline-dark" onClick={() => onGoBack()}>돌아가기</button></div>
                    </div>

                </form>
            </div >
  </div></main></div>
    

    );
};

export default AdminNoticeDetailForm;