import React, { useEffect, useState } from "react";
import axios from "axios";

function FaqItem({ faq, onDetail, checkedList, checkHandler }) {

    // // 이미지 미리보기 (필요할때 주석 해제하기)
    // const [viewImg, setViewImg] = useState('');
    // const getFaqImage = async () => {
    //     console.log(faq.faqImgs[0].imgUrl);
    //     axios(
    //         {
    //             url: '/faq/getImg',
    //             method: 'post',
    //             data: {
    //                 imgUrl: faq.faqImgs[0].imgUrl
    //             },
    //             baseURL: 'http://localhost:8090',
    //             responseType: 'arraybuffer',
    //         }
    //     ).then((response) => {
    //         const blob = new Blob([response.data], { type: 'image/jpeg' });
    //         const imageUrl = URL.createObjectURL(blob);
    //         setViewImg(imageUrl)
    //     });
    // }
    // //페이지 로드될때 이미지 나오게하기
    // useEffect(() => {
    //     getFaqImage()
    // }, [])
    // {/* 이미지 미리보기 필요시 주석 해제  + 시간 아래에 넣기 */ }
    // <td>
    //         <img key={faq.faqImgs} src={viewImg} style={{ width: '100px', height: '100px' }} />
    // </td>

    return (
            <tr>
                <td><input type='checkbox' id={faq.id} checkedList={checkedList.includes(faq.id)} onChange={(e) => checkHandler(e, faq.id)} /></td>
                <td>{faq.id}</td>
                <td onClick={() => onDetail(faq)}>{faq.title}</td>
                <td>{faq.createdBy}</td>
                <td>{faq.updateTime.split('T')[0]}</td>
            </tr>
    );
}
export default FaqItem;