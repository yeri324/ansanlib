import './FaqList.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FaqList() {
    const [faqList, setFaqList] = useState();

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


    const getFaqDto = () => {
        
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성시간</th>

                    </tr>
                </thead>
                {faqList && faqList.map((item, index) => (
                    <div key={index} className="slide">

                        <div >
                            <tr>
                                <th>{item.id}</th>
                                <th><Link to={`/faq/detail/${item.id}`} onClick={getFaqDto}>{item.title}</Link></th>
                                <th>{item.regTime}</th>
                            </tr>
                        </div>

                    </div>
                ))}
            </table>
        </div>
    );
};

export default FaqList;