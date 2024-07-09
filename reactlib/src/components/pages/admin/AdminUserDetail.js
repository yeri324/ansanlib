import axios from 'axios';
import UserResItem from './UserResItem';
import UserLoanItem from './UserLoanItem';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import "./AdminUserList.css";


const AdminUserDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userDetail, setUserDetail] = useState({});
    const [userRes, setUserRes] = useState([]);
    const [userLoan, setUserLoan] = useState([]);

    useEffect(() => {
        getDataset(id);

    }, []);


    const getDataset = () => {
        axios(
            {
                url: '/admin/user/detail',
                method: 'post',
                data: {
                    id: id,
                },
              
            }
        ).then((res) => {
            setUserDetail(res.data);
        })
            .catch((err) => {
                setUserDetail([]);
            });

        axios(
            {
                url: '/admin/user/getRes',
                method: 'post',
                data: {
                    id: id,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((res) => {
            setUserRes(res.data);
        })
            .catch((err) => {
                setUserRes([]);
            });

        axios(
            {
                url: '/admin/user/getLoan',
                method: 'post',
                data: {
                    id: id,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((res) => {
            setUserLoan(res.data);
        })
            .catch((err) => {
                setUserLoan([]);
            });

    };

    const onClickToPenalty = () => {
        if (userDetail.status === "ONPENALTY") { alert("이미....") }
        else {
            if (window.confirm('수정 하시겠습니까?')) {
                axios(
                    {
                        url: '/admin/user/penalty',
                        method: 'put',
                        data: {
                            id: id,
                        },
                        baseURL: 'http://localhost:8090',
                    }
                ).then((res) => {
                    setUserDetail(res.data);
                })
                .catch((err) => {
                    setUserDetail([]);
                });
            }
        }
    }

    const onClickToCancelRes = (e) => {
        if (window.confirm('예약을 취소하시겠습니까?')) {
            axios(
                {
                    url: '/admin/user/cancelRes',
                    method: 'delete',
                    data: {
                        id: e.target.value,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate(`/admin/user/detail/${id}`, { repalce: true }));
        }
    }
    const onClickToReturn = (e) => {
        if (window.confirm('반납하시겠습니까?')) {
            axios(
                {
                    url: '/admin/user/return',
                    method: 'delete',
                    data: {
                        id: e.target.value,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate(`/admin/user/detail/${id}`, { repalce: true }));
        }
    }

    const onClickToPay = () => {
        if (userDetail.lateFee === 0) { alert("납부할 연체료가 없습니다."); }
        else if (window.confirm('연체료를 납부하겠습니까?')) {
            axios(
                {
                    url: '/admin/user/pay',
                    method: 'put',
                    data: {
                        id: id,
                    },
                    baseURL: 'http://localhost:8090',
                }
            );
            alert("납부완료")
            window.location.reload(navigate(`/admin/user/detail/${id}`, { repalce: true }));
        }
       

    }





    return (
        
        <div>
            <p>userDetail</p>
            {console.log(userDetail)}
            <p>loginid : {userDetail.loginid}</p>
            <p>userId : {userDetail.userId}</p>
            <p>penalty : {userDetail.penalty}</p>
            <p>lateFee : {userDetail.lateFee}</p>
            <p>name : {userDetail.name}</p>
            <p>status : {userDetail.status}</p>
            <p>--penaltyDate--</p>
            <p>{userDetail.penaltyDate}</p>

            <p>---userRes---</p>

            {console.log(userRes)}
            {userRes.map((res) => (
                <UserResItem key={res.id} res={res} onClickToCancelRes={onClickToCancelRes} />
            ))}
           <p>---userLoan---</p>
           {console.log(userLoan)}
           {userLoan.map((loan) => (
                <UserLoanItem key={loan.id} loan={loan} onClickToReturn={onClickToReturn}/>
            ))}



            <button onClick={(e) => onClickToPenalty(e)}>penalty</button>
            <button onClick={() => onClickToPay()}>납부완료</button>
        </div>
       );
};

export default AdminUserDetail;