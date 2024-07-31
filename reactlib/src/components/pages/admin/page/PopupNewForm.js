import React, { useState, useEffect} from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PopupNewForm = ({ setIsAddOpen }) => {

    const [popupData, setPopupData] = useState({
        title: "",
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        status: "DISPLAY",
        xLoc: 300,
        yLoc: 250
    })
    const [image, setImage] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [showWhiteScreen, setShowWhiteScreen] = useState(false);
    const navigate=useNavigate();


    // 생성정보보내기
    const onCreate = (e) => {
        const formData = new FormData();
        formData.append("title", popupData.title);
        formData.append("startDate", popupData.startDate);
        formData.append("endDate", popupData.endDate);
        formData.append("status", popupData.status);
        formData.append("xLoc", popupData.xLoc);
        formData.append("yLoc", popupData.yLoc);
        formData.append("popupImg", image);

        axios.post('/popup/admin', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                alert("생성이 완료되었습니다.")
                window.location.reload(navigate('/admin/popup'));
            });

    }

    // 팝업데이터 설정(이미지제외)
    const onInputChange = (e) => {
        setPopupData({ ...popupData, [e.target.name]: e.target.value });
    };

    //이미지 미리보기 설정
    const getPreviewImg = () => {
        if (image !== "") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(image);
        }
    }

    //이미지변경
    const onImgChange = (e) => {
        setImage(e.target.files[0])
    };

    useEffect(() => {
        getPreviewImg()
    }, [image])

    //팝업좌표선택 화면
    const handleButtonClick = () => {
        setShowWhiteScreen(true);
    };

    //좌표 선택
    const handleScreenClick = (e) => {
        if (showWhiteScreen) {
            setPopupData({ ...popupData, xLoc: e.clientX, yLoc: e.clientY });
            setShowWhiteScreen(false);
        }
        console.log(popupData);
    };


    return (
        <div className="popupForm" style={{ border: "1px solid #888" }}>
    <button className="closeButton" onClick={() => setIsAddOpen(false)}>&times;</button>
    <div className="formContainer">
        <div className="formSection">
            <div className="divSec">
                <label className="pop-label">제목</label>
                <input type="text" className="form-control" name="title" onChange={onInputChange} />
            </div>
            <div className="divSec">
                <label className="pop-label">시작일</label>
                <input type="date" className="form-control" value={popupData.startDate} name="startDate" onChange={onInputChange} />
            </div>
            <div className="divSec">
                <label className="pop-label">종료일</label>
                <input type="date" className="form-control" value={popupData.endDate} name="endDate" onChange={onInputChange} />
            </div>
            <div className="divSec">
                <label className="pop-label">상태</label>
                <div className="form-check">
                    <input type="radio" className="form-check-input" name="status" id="DISPLAY" value="DISPLAY" checked={popupData.status === 'DISPLAY'} onChange={onInputChange} />
                    <label className="form-check-label" htmlFor="DISPLAY">표시</label>
        
                    <input type="radio" className="form-check-input" name="status" id="HIDDEN" value="HIDDEN" checked={popupData.status === 'HIDDEN'} onChange={onInputChange} />
                    <label className="form-check-label" htmlFor="HIDDEN">숨김</label>
                </div>
            </div>
            <div className="divSec">
                {showWhiteScreen && (<div className="whiteScreen" onClick={handleScreenClick} />)}
                <div className="locationPoint">
                    X: <input type="text" className="form-control" value={popupData.xLoc} readOnly />
                    Y: <input type="text" className="form-control" value={popupData.yLoc} readOnly />
                </div>
                <button className="btn loc-btn" onClick={handleButtonClick}>위치 변경</button>
            </div>
        </div>
        <div className="formSection">
            <div className="divSec">
                <div className="pop-Img">
                    <div className="img-fluid">
                    <img src={previewImg}  alt="미리보기"  />
                    </div>
                    <input type="file" className="form-control-file" id="popImg" name="file" onChange={onImgChange} />
                    <label htmlFor="popImg" className="pop-file-label">{image == ""?"이미지를 추가해주세요.":image.name}</label>
                </div>
            </div>
        </div>
    </div>
    <div className="create-pop-button">
        <button className="btn create-btn" onClick={onCreate}>추가</button>
    </div>
</div>
    )
}

export default PopupNewForm;