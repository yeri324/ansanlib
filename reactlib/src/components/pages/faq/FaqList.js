import './FaqList.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FaqList() {
    const [faqList, setFaqList] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getDataset();
    }, []);

    const getDataset = () => {
        axios.get('/faq/list')
            .then((res) => {
                setFaqList(res.data);
            })
            .catch((err) => {
                setFaqList([]);
            });
    };

    const handleDetail = ( {item} ) => {
        navigate(`/faq/detail/${item.id}`, {
            state : {
                id : `${item.id}`,
                title : `${item.title}`,
                content : `${item.content}`,
                regTime : `${item.regTime}`,
                updateTime : `${item.updateTime}`,
            }
        })
    }

    // function DelFaqList() {
    //     if (window.confirm('삭제 하시겠습니까?')) {
    //         axios(
    //             {
    //                 url: `/faq/delete/${id}`,
    //                 method: 'DELETE',
    //                 data: {
    //                     id: id,
    //                 },
    //                 baseURL: 'http://localhost:8090',
    //             }
    //         ).then(function (response) {
    //             console.log(response.data);
    //         });
    //         navigate("/faq/list", { repalce: true });
    //     }
    // }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성시간</th>
                        <th>수정시간</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                {faqList && faqList.map((item, index) => (
                    <div key={index} className="slide">
                        <div >
                            <tr>
                                <th>{item.id}</th>
                                <th onClick={() => handleDetail({item})}>{item.title}</th>
                                <th>{item.regTime}</th>
                                <th>{item.updateTime}</th>
                                <input type='radio' />
                            </tr>
                        </div>

                    </div>
                ))}
                {/* <button onClick={DelFaqList}>삭제하기</button> */}
            </table>
        </div>
    );
};

export default FaqList;