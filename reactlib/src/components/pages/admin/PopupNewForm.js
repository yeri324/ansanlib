import React, { useState, useEffect} from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const PopupNewForm = ({ handleOpen }) => {

    const [popupData, setPopupData] = useState({
        title: "",
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        status: "DISPLAY",
        xLoc: 300,
        yLoc: 250
    })
    const [image, setImage] = useState("");
    const [previewImg, setPreviewImg] = useState([]);
    const [showWhiteScreen, setShowWhiteScreen] = useState(false);
    const navigate=useNavigate();

    //위치선택 화면
    const handleButtonClick = () => {
        setShowWhiteScreen(true);
    };

    //위치선택
    const handleScreenClick = (e) => {
        if (showWhiteScreen) {
            setPopupData({ ...popupData, xLoc: e.clientX, yLoc: e.clientY });
            setShowWhiteScreen(false);
        }
        console.log(popupData);
    };

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

        axios.post('/admin/popup', formData,
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

    //이미지변경
    const onImgChange = (e) => {
        setImage(e.target.files[0])
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

    useEffect(() => {
        getPreviewImg()
    }, [image])

    return (
        <div className="popupForm">
            <button onClick={handleOpen}>&times;</button>
            <div className="formContainer">
                <div className="formSection">
                    <div>
                        <label>title</label>
                        <input type="text" name="title" onChange={onInputChange} />
                    </div>
                    <div>
                        <label>startDate</label>
                        <input type="date" value={popupData.startDate} name="startDate" onChange={onInputChange} />
                    </div>

                    <div>
                        <label>endDate</label>
                        <input type="date" value={popupData.endDate} name="endDate" onChange={onInputChange} />
                    </div>
                    <div>
                        <input type="radio" name="status" id="DISPLAY" value="DISPLAY" checked={popupData.status === 'DISPLAY'} onChange={onInputChange} />
                        <label htmlFor="DISPLAY">표시</label>
                        <input type="radio" name="status" id="HIDDEN" value="HIDDEN" checked={popupData.status === 'HIDDEN'} onChange={onInputChange} />
                        <label htmlFor="HIDDEN">숨김</label>
                    </div>
                    <div>

                        {showWhiteScreen && (<div className="whiteScreen" onClick={handleScreenClick} />)}
                        <div className="locationPoint">
                            X: <input type="text" value={popupData.xLoc} readOnly />
                            Y: <input type="text" value={popupData.yLoc} readOnly />
                        </div>
                        <button onClick={handleButtonClick}>위치 변경</button>
                    </div>
                </div>
                <div className="formSection">
                    <div>
                        <img src={previewImg} style={{ width: '200px', height: '250px' }} />
                        <input type="file" name='file' onChange={onImgChange} />
                        <label>이미지</label>
                    </div>
                </div>
            </div>
            <button onClick={onCreate}>추가</button>
        </div>
    )
}

export default PopupNewForm;