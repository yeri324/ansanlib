import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PopupForm = ({ popup, setIsOpen }) => {
    console.log(popup);
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

        axios.put('http://localhost:8090/admin/popup', formData,
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
        console.log(image)
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
        <div className="popupForm">
            <button onClick={onClosePopup}>&times;</button>
            <div className="formContainer">
                <div className="formSection">
                    <div>
                        <label>title</label>
                        <input type="text" name='title' value={popItem.title} onChange={handleChange} />
                    </div>
                    <div>
                        <label>startDate</label>
                        <input type="date" name='startDate' value={popItem.startDate} onChange={handleChange} />
                    </div>

                    <div>
                        <label>endDate</label>
                        <input type="date" name='endDate' value={popItem.endDate} onChange={handleChange} />
                    </div>
                    <div>
                        <input type="radio" name="status" id="DISPLAY" value="DISPLAY" checked={popItem.status === 'DISPLAY'} onChange={handleChange} />
                        <label htmlFor="DISPLAY">표시</label>
                        <input type="radio" name="status" id="HIDDEN" value="HIDDEN" checked={popItem.status === 'HIDDEN'} onChange={handleChange} />
                        <label htmlFor="HIDDEN">숨김</label>
                    </div>
                    <div>

                        {showWhiteScreen && (<div className="whiteScreen" onClick={handleScreenClick} />)}
                        <div className="locationPoint">
                            X: <input type="text" value={popItem.xloc} readOnly />
                            Y: <input type="text" value={popItem.yloc} readOnly />
                        </div>
                        <button onClick={handleButtonClick}>위치 변경</button>
                    </div>
                </div>
                <div className="formSection">
                    <div>
                        <img src={viewImg} style={{ width: '200px', height: '250px' }} />
                        <input type="file" name='file' onChange={handleImgChange} />
                        <label>{popup.imgName}</label>
                    </div>
                </div>
            </div>
            <button onClick={onUpdate}>수정하기</button>
        </div>
    )
}
export default PopupForm;