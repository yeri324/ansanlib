import React, { useEffect } from 'react';
import './popup.css';
import { useState } from 'react';
import axios from 'axios';

const Popup = ({ popup }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [viewImg, setViewImg] = useState("");

  const closePopup = () => {
    setShowPopup(false);
  };

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
            console.log(imageUrl);
        });
    
}


useEffect(()=>{
  const hidePopup = localStorage.getItem('hidePopup');
  if (hidePopup) {
    setShowPopup(false);
  }
  getPopImage()
},[])

const handleHidePopup = () => {
  localStorage.setItem('hidePopup', 'true');
  setShowPopup(false);
};

  return (
    <>
    {showPopup && (
    <div id="popup">
      <img src={viewImg} alt={popup.title} style={{width: '360px',height:'420px',border:'1px solid #333'}}/>
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
