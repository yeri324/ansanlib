import axios from "axios";
import React, { useEffect, useState } from "react";

function ImgPreview({ putImage}) {

    useEffect(() => {
        getNoticeImage();
    }, [putImage]);

    // 모든 이미지 미리보기
    const [viewImg, setViewImg] = useState('');
    const getNoticeImage = () => {
        if (putImage.file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setViewImg(reader.result);
            };
            reader.readAsDataURL(putImage.file);
        }else{
        axios(
            {
                url: `/getImg`,
                method: 'post',
                data: {
                    imgUrl: putImage.imgUrl
                },
                baseURL: 'http://localhost:8090',
                responseType: 'arraybuffer',
            }
        ).then((response) => {
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            setViewImg(imageUrl)
        });}
    }

    return (
        <div class='img-preview-container'>
            <img src={viewImg} class='img-preview' />
        </div>
    );
}

export default ImgPreview;