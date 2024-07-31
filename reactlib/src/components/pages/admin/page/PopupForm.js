import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PopupForm = ({ popup, setIsOpen }) => {
    const [popItem, setPopItem] = useState(popup);
    const [viewImg, setViewImg] = useState('');
    const [image, setImage] = useState("");
    const [showWhiteScreen, setShowWhiteScreen] = useState(false);
    const navigate = useNavigate();


    //팝업닫기
    const onClosePopup = () => {
        setIsOpen(false);
    }

    //데이터수정
    const onUpdate = () => {
        const formData = new FormData();
        formData.append("id", popItem.id);
        formData.append("title", popItem.title);
        formData.append("startDate", popItem.startDate);
        formData.append("endDate", popItem.endDate);
        formData.append("status", popItem.status);
        formData.append("xLoc", popItem.xloc);
        formData.append("yLoc", popItem.yloc);
        formData.append("popupImg", image);

        axios.put('http://localhost:8090/popup/admin', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                alert("수정이 완료되었습니다.");
                window.location.reload(navigate('/admin/popup'));
            });

    }

    //팝업데이터 설정(이미지제외)
    const handleChange = (e) => {
        setPopItem({
            ...popItem,
            [e.target.name]: e.target.value,
        })
    }

    //이미지 미리보기 설정
    const getPopImage = () => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setViewImg(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            axios(
                {
                    url: `/getImg`,
                    method: 'post',
                    data: {
                        imgUrl: popItem.imgUrl
                    },
                    baseURL: 'http://localhost:8090',
                    responseType: 'arraybuffer',
                }
            ).then((response) => {
                const blob = new Blob([response.data], { type: 'image/jpeg' });
                const imageUrl = URL.createObjectURL(blob);
                setViewImg(imageUrl)
            });
        }
    }

    //이미지변경
    const handleImgChange = (e) => {
        setImage(e.target.files[0])
    }

    useEffect(() => {
        getPopImage();
    }, [image]);

    //팝업좌표선택 화면
    const handleButtonClick = () => {
        setShowWhiteScreen(true);
    };

    //좌표 선택
    const handleScreenClick = (e) => {
        if (showWhiteScreen) {
            setPopItem({ ...popItem, xloc: e.clientX, yloc: e.clientY });
            setShowWhiteScreen(false);
        }
    };

    return (
        <div className="popupForm" style={{border: "1px solid #888"}}>
            <button className="closeButton" onClick={onClosePopup}>&times;</button>
            <div className="formContainer">
                <div className="formSection">
                    <div className="divSec">
                        <label className="pop-label">제목</label>
                        <input type="text" className="form-control" name="title" value={popItem.title} onChange={handleChange} />
                    </div>
                    <div className="divSec">
                        <label className="pop-label">시작일</label>
                        <input type="date" className="form-control" name="startDate" value={popItem.startDate} onChange={handleChange} />
                    </div>
                    <div className="divSec">
                        <label className="pop-label">종료일</label>
                        <input type="date" className="form-control" name="endDate" value={popItem.endDate} onChange={handleChange} />
                    </div>
                    <div className="divSec">
                        <label className="pop-label">상태</label>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" name="status" id="DISPLAY" value="DISPLAY" checked={popItem.status === 'DISPLAY'} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="DISPLAY">표시</label>
        
                            <input type="radio" className="form-check-input" name="status" id="HIDDEN" value="HIDDEN" checked={popItem.status === 'HIDDEN'} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="HIDDEN">숨김</label>
                        </div>
                    </div>
                    <div className="divSec">
                        {showWhiteScreen && (<div className="whiteScreen" onClick={handleScreenClick} />)}
                        <div className="locationPoint">
                            X: <input type="text" className="form-control" value={popItem.xloc} readOnly />
                            Y: <input type="text" className="form-control" value={popItem.yloc} readOnly />
                        </div>
                        <button className="btn loc-btn" onClick={handleButtonClick}>위치 변경</button>
                    </div>
                </div>
                <div className="formSection">
                    <div className="divSec">
                        <div className="pop-Img">
                        <div className="img-fluid">
                        <img src={viewImg}  alt="미리보기" />
                    </div>
                       
                        <input type="file" className="form-control-file" id="popImg" name="file" onChange={handleImgChange} />
                        <label htmlFor="popImg" className="pop-file-label">{image == "" ? popup.imgName : image.name}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="create-pop-button">
            <button className="btn create-btn" onClick={onUpdate}>수정하기</button>
            </div>
        </div>
    )
}
export default PopupForm;