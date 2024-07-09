import axios from "axios";
import React, { useEffect, useState } from "react";

function ImgPreview({ board }) {

    useEffect(() => {
        getBoardImage();
    }, []);

    // 이미지 미리보기
    const [viewImg, setViewImg] = useState('');
    const getBoardImage = () => {
        console.log(board.imgUrl);
        axios(
            {
                url: '/board/getImg',
                method: 'post',
                data: {
                    imgUrl: board.imgUrl
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