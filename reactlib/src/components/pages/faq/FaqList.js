import './FaqList.css';
import axios from 'axios';
import React, { useEffect, useState, useCallback, } from 'react';
import { useNavigate } from 'react-router-dom';

function FaqList() {
    const [faqList, setFaqList] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [isCheckAll, setIsCheckAll] = useState(false);
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
                id: `${item.id}`,
                title: `${item.title}`,
                content: `${item.content}`,
                regTime: `${item.regTime}`,
                updateTime: `${item.updateTime}`,
            }
        })
    }

    // 전체선택하기
    const changeAllCheck = (e) => {
        if (e.target.checked) {
            setIsCheckAll(true)
        } else {
            setIsCheckAll(false)
            setCheckedList([])
        }
    };

    // 개별선택하기
    const checkedBox = () => {
        setIsCheckAll(false)
        setIsChecked(true)
        setCheckedList([])
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


    // //체크박스 관리
    // useEffect(() => {
    //     if (checkedList.length !== 0 && checkedList.length === faqList.length) {
    //         setIsCheckAll(true)
    //     }
    // }, [checkedList])

    //FAQ 다중삭제하기
    const DelFaqList = useCallback(
        (e) => {
            console.log('checkedList:', checkedList);
            if (window.confirm('삭제 하시겠습니까?')) {
                axios(
                    {
                        url: `/faq/delete`,
                        method: 'DELETE',
                        data: {
                            id: checkedList,
                        },
                        baseURL: 'http://localhost:8090',
                    }
                ).then(function (response) {
                    console.log(response.data);
                });
                navigate("/faq/list", { repalce: true });
            }
        },
        [checkedList]
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input type='checkbox' id='all_class_checkbox' onClick={e => changeAllCheck(e)} checked={isCheckAll} />
                            <label htmlFor='all_class_checkbox' />
                            전체선택</th>
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
                <button onClick={DelFaqList}>삭제하기</button>
            </table >
        </div >
    );
};

export default FaqList;