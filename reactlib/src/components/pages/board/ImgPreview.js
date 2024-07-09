import axios from "axios";
import React, { useEffect, useState } from "react";

function ImgPreview({ putImage, board }) {

    useEffect(() => {
        getNoticeImage();
    }, []);

    // 모든 이미지 미리보기
    const [viewImg, setViewImg] = useState('');
    const getNoticeImage = () => {
        console.log(putImage.imgUrl);
        axios(
            {
                url: `/${board}/getImg`,
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
        });
    }

    return (
            <img src={viewImg} style={{ width: '100px', height: '100px' }} class='img-preview'/>
    );
}

export default ImgPreview;