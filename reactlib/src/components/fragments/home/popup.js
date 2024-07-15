import React from 'react';
import './popup.css';
import ansan_popup from '../../images/popup/ansan_popup.png';


const Popup = ({ onClose }) => {
  return (
    <div id="popup">
      <img src={ansan_popup} alt="Advertisement" />
      <div>
        <button className="btn_C" onClick={onClose}>오늘 하루 동안 보지 않기</button>
        <button className="btn_X" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Popup;
