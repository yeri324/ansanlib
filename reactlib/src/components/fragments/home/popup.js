import React, { useEffect } from 'react';
import './popup.css';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Popup = ({ popup }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [viewImg, setViewImg] = useState("");


  //팝업이미지가져오기
  const getPopImage = () => {
    axios(
      {
        url: `/getImg`,
        method: 'post',
        data: {
          imgUrl: popup.imgUrl
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

  //오늘하루 보지않기
  const handleHidePopup = () => {
    Cookies.set(`popup${popup.id}`, 'false', );
    setShowPopup(false);
  };

  //팝업닫기
  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(()=>{
    const popCookie = Cookies.get(`popup${popup.id}`)
    if(!popCookie) setShowPopup(true)
    getPopImage()

  },[])

  return (
    <>
      {showPopup && (
        <div id="popup"
          style={{
            top: `${popup.yloc}px`,
            left: `${popup.xloc}px`
          }}
        >
          <img src={viewImg} alt={popup.title} style={{ width: '360px', height: '420px' }} />
          <div>
            <button className="btn_C" onClick={handleHidePopup}>오늘 하루 동안 보지 않기</button>
            <button className="btn_X" onClick={closePopup}>X</button>
          </div>
        </div>)
      }
    </>
  );
};

export default Popup;
