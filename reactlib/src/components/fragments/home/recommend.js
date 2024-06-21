import React from "react";
// import axios from 'axios';
import './recommend.css';


function Recommend() {


    return (
        <div className="recommend_container">
            <div className="slider">
                <p>책 리스트입니다. 슬라이드 예정</p>
                <a>책 표지</a>
                <h3>책 제목</h3>
                <p>책 내용 버튼변경예정</p>
            </div>
            <div className="btn_list">
            <button className="slider_button">이전</button>
            <button className="slider_button">다음</button>
            </div>
        </div>
    );
}


export default Recommend;