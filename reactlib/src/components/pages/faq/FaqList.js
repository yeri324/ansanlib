import './FaqList.css';
import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';

function FaqList() {
    const [faqList, setFaqList] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [checkedArr, setCheckedArr] = useState([]);
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
            setCheckedArr([])
        }
    };

    // 개별선택하기
    const checkedBox = () => {
        setIsCheckAll(false)
        setIsChecked(true)
        setCheckedArr([])
    }

    ////FAQ삭제하기
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
                        <th>
                            <input type='checkbox' id='all_class_checkbox' onClick={e => changeAllCheck(e)} checked={isCheckAll} />
                            전체선택{checkedArr.length > 0 && checkedArr.length !== faqList.length}</th>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성시간</th>
                        <th>수정시간</th>
                    </tr>
                </thead>
                {faqList && faqList.map((item, index) => (
                    <div key={index} className="slide">
                        <div >
                            <tr>
                                <input type='checkbox' checked={isCheckAll} />
                                <th>{item.id}</th>
                                <th onClick={() => handleDetail({ item })}>{item.title}</th>
                                <th>{item.regTime}</th>
                                <th>{item.updateTime}</th>
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