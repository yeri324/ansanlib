import axios from "axios";
import React, { useEffect, useState } from "react";

function ImgPreview({ faq }) {

    useEffect(() => {
        getFaqImage();
    }, []);

    // 이미지 미리보기
    const [viewImg, setViewImg] = useState('');
    const getFaqImage = () => {
        console.log(faq.imgUrl);
        axios(
            {
                url: '/faq/getImg',
                method: 'post',
                data: {
                    imgUrl: faq.imgUrl
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
        <div>
            <img src={viewImg} style={{ width: '100px', height: '100px' }} />
        </div>
    );
}

export default ImgPreview;