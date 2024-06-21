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
                updateTime : `${item.updateTime}`,
            }
        })
    }

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
                                <th onClick={() => handleDetail({item})}>{item.title}</th>
                                <th>{item.updateTime}</th>
                            </tr>
                        </div>

                    </div>
                ))}
            </table>
        </div>
    );
};

export default FaqList;