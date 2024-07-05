import React, { useEffect, useState } from "react";
import axios from "axios";

function FaqItem({ faq, onDetail, checkedList, checkHandler }) {
console.log(faq)
    // //이미지 띄우기 - 아직 못했음
    const [viewImg, setViewImg] = useState('');
    // const handlePreview = () => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(faq.faqImgs[0]);
    //     reader.onload = () => {
    //         setViewImg = reader.result;
    //     };
    // };
    

  const getFaqImage = async ()=>{
    console.log(faq.faqImgs[0].imgUrl);
    axios(
        {
            url: '/faq/getImg',
            method: 'post',
            data: {
                imgUrl:faq.faqImgs[0].imgUrl
            },
            baseURL: 'http://localhost:8090',
            responseType:'arraybuffer',
        }
    ).then((response) => {
        const blob = new Blob([response.data],{type:'image/jpeg'});
        const imageUrl = URL.createObjectURL(blob);
        setViewImg(imageUrl)
    });
  }


        return (
            <div>
                <div>
                    <td><input type='checkbox' id={faq.id} checkedList={checkedList.includes(faq.id)} onChange={(e) => checkHandler(e, faq.id)} /></td>
                    <td>{faq.id}</td>
                    <td onClick={() => onDetail(faq)}>{faq.title}</td>
                    <td>{faq.updateTime.split('T')[0]}</td>
                    {!faq.faqImgs[0] ? null : <td><img src={faq.faqImgs[0].imgUrl} /></td>}

                    <td>
                        <img key={faq.faqImgs} src={viewImg} />
                                    <button onClick={getFaqImage}>버튼!</button>
                </td>
                </div>

            </div>
        );
    }
    export default FaqItem;