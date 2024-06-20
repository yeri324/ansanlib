import './FaqList.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            {faqList && faqList.map((item, index) => (
                <div key={index} className="slide">
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성시간</th>
                               
                            </tr>
                        </thead>
                        <div >
                            <tr>
                            <th><a>{item.id}</a></th>
                            <th>{item.title}</th>
                            <th>{item.regTime}</th>
                            </tr>
                        </div>
                    </table>
                </div>

            ))}

        </div>
    );
};

export default FaqList;