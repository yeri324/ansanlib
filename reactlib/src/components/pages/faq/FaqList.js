import './FaqList.css';
import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';

function FaqList() {
    const [faqList, setFaqList] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const navigate = useNavigate();

    //리스트 읽기
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

    //상세페이지 이동
    const handleDetail = ({ item }) => {
        navigate(`/faq/detail/${item.id}`, {
            state: {
                ...item,
            }
        })
    }

    const checkedHandler = (value, isChecked) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);
            return;
        }
        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));
            return;
        }
        return;
    };

    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedHandler(value, e.target.checked);
    };

    //FAQ 다중삭제하기
    const delFaqList = () => {
        if (window.confirm('삭제 하시겠습니까?')) {
            axios(
                {
                    url: `/faq/delete`,
                    method: 'DELETE',
                    data: {
                        idList: checkedList,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/faq/list", { repalce: true }));
        }
        
    }

    // 생성페이지 이동
    const handleNew = () => {
        navigate(`/faq/new`)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th> - </th>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성시간</th>
                        <th>수정시간</th>
                    </tr>
                </thead>
                <div className="slide">
                    {faqList && faqList.map((item, index) => (
                        <div key={index}>
                            <tr>
                                <th><input type='checkbox' id={item.id} checked={checkedList.includes(item.id)} onChange={(e) => checkHandler(e, item.id)} /></th>
                                <th>{item.id}</th>
                                <th onClick={() => handleDetail({ item })}>{item.title}</th>
                                <th>{item.regTime}</th>
                                <th>{item.updateTime}</th>
                            </tr>
                        </div>
                    ))}
                </div>
                <button onClick={delFaqList}>삭제하기</button>
                <button onClick={handleNew}>작성하기</button>
            </table >
        </div >
    );
};

export default FaqList;