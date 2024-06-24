import './FaqList.css';
import axios from 'axios';
import React, { useEffect, useState,useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function FaqList() {
    const [faqList, setFaqList] = useState();
    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    //------------------------------------------------------------------------
    const checkedItemHandler = (value, isChecked) => {
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
        checkedItemHandler(value, e.target.checked);

    };

    const onSubmit = useCallback(
        (e) => {
       

            console.log('checkedList:', checkedList);
        },
        [checkedList]
    );
    //-------------------------------------------------



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
    // const changeAllCheck = (e) => {
    //     if (e.target.checked) {
    //         setIsCheckAll(true)
    //     } else {
    //         setIsCheckAll(false)
    //     }
    // };

    // 개별선택하기
    // const changeCheck = (e) => {
    //     if (e.target.checked) setIsChecked(true)
    //     else setIsChecked(false)

    // }

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
                        <th></th>
                            {/* <input type='checkbox' id='all_class_checkbox' onClick={e => changeAllCheck(e)} checked={isCheckAll} />
                            전체선택</th> */}
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성시간</th>
                        <th>수정시간</th>
                    </tr>
                </thead>
                {/* {faqList && faqList.map((item, index) => (
                    <div key={index} className="slide">
                        <div >
                            <tr>
                                <input type='checkbox' checked={isChecked} onClick={e => changeCheck(e)} />
                                <th>{item.id}</th>
                                <th onClick={() => handleDetail({ item })}>{item.title}</th>
                                <th>{item.regTime}</th>
                                <th>{item.updateTime}</th>
                            </tr>
                        </div>

                    </div>
                ))} */}
                <div className="slide">
                    {faqList && faqList.map((item, index) => (
                        <div className='checkbox' key={index}>
                            <input type='checkbox' id={item.id} checked={checkedList.includes(item.id)} onChange={(e) => checkHandler(e, item.id)} />
                            <th>{item.id}</th>
                            <th onClick={() => handleDetail({ item })}>{item.title}</th>
                            <th>{item.regTime}</th>
                            <th>{item.updateTime}</th>
                        </div>
                    )
                    )}
                </div>

                <button type='submit' onClick={onSubmit}>submit</button>
                {/* <button onClick={DelFaqList}>삭제하기</button> */}
            </table>
        </div>
    );
};

export default FaqList;