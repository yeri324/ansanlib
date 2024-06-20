import './FaqList.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FaqList() {
    const [faqList, setFaqList] = useState()

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
                            <div >
                                <h4>{item.id}</h4>
                                <h4>{item.title} </h4>
                                <h4>{item.content} </h4>
                            </div>
                        </div>

                    </div>
                ))}
            </table>
        </div>
    );
};

export default FaqList;