import axios from 'axios';
import UserResItem from './UserResItem';
import UserLoanItem from './UserLoanItem';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSide from './AdminSide';
import "./AdminUserDetail.css";



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
        axios({
            url: '/admin/user/detail',
            method: 'post',
            data: {
                id: id,
            },
        }).then((res) => {
            setUserDetail(res.data);
        }).catch((err) => {
            setUserDetail({});
        });

        axios({
            url: '/admin/user/getRes',
            method: 'post',
            data: {
                id: id,
            },
        }).then((res) => {
            setUserRes(res.data);
        }).catch((err) => {
            setUserRes([]);
        });

        axios({
            url: '/admin/user/getLoan',
            method: 'post',
            data: {
                id: id,
            },
        }).then((res) => {
            setUserLoan(res.data);
        }).catch((err) => {
            setUserLoan([]);
        });
    };

    const onClickToPenalty = () => {
        if (userDetail.status === "ONPENALTY") {
            alert("이미 패널티 상태입니다.");
        } else {
            if (window.confirm('수정 하시겠습니까?')) {
                axios({
                    url: '/admin/user/penalty',
                    method: 'put',
                    data: {
                        id: id,
                    },
                }).then((res) => {
                    setUserDetail(res.data);
                }).catch((err) => {
                    setUserDetail({});
                });
            }
        }
    };

    const onClickToCancelRes = (e) => {
        if (window.confirm('예약을 취소하시겠습니까?')) {
            axios({
                url: '/admin/user/cancelRes',
                method: 'delete',
                data: {
                    id: e.target.value,
                },
            }).then(() => {
                window.location.reload(navigate(`/admin/user/detail/${id}`, { replace: true }));
            });
        }
    };

    const onClickToReturn = (e) => {
        if (window.confirm('반납하시겠습니까?')) {
            axios({
                url: '/admin/user/return',
                method: 'delete',
                data: {
                    id: e.target.value,
                },
            }).then(() => {
                window.location.reload(navigate(`/admin/user/detail/${id}`, { replace: true }));
            });
        }
    };

    const onClickToPay = () => {
        if (userDetail.lateFee === 0) {
            alert("납부할 연체료가 없습니다.");
        } else if (window.confirm('연체료를 납부하겠습니까?')) {
            axios({
                url: '/admin/user/pay',
                method: 'put',
                data: {
                    id: id,
                },
            }).then(() => {
                alert("납부 완료");
                window.location.reload(navigate(`/admin/user/detail/${id}`, { replace: true }));
            });
        }
    };

    return (
        <>
            <AdminHeader />
            <div className="admin-main-container">
                <AdminSide />
                <div className="admin-content">
                   
                    <h1> {userDetail.name} 님 상세 정보</h1>


                    <table className="userdetail">
                        <thead>
                            <tr className="admintr">
                                <th style={{ width: "14%" }}>Login ID</th>
                                <th style={{ width: "14%" }}>UserId</th>
                                <th style={{ width: "14%" }}>Penalty</th>
                                <th style={{ width: "14%" }}>LateFee</th>
                                <th style={{ width: "14%" }}>이름</th>
                                <th style={{ width: "14%" }}>패널티상태</th>
                                <th style={{ width: "14%" }}>PenaltyDate</th>
                            </tr>
                        </thead>
                        <tbody className="userbody">
                            <tr>
                                <td>{userDetail.loginid}</td>
                                <td>{userDetail.userId}</td>
                                <td>{userDetail.penalty}</td>
                                <td>{userDetail.lateFee}</td>
                                <td>{userDetail.name}</td>
                                <td>{userDetail.status}</td>
                                <td>{userDetail.penaltyDate}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='buttons'>
                        <button type="button" className="btn btn-outline-dark" onClick={onClickToPenalty}>제재하기</button>
                        <button type="button" className="btn btn-outline-dark" onClick={() => onClickToPay()}>납부 완료</button>
                    </div>
                    <div className='detailbottom'>
                        <div className='bottomTable'>
                            <h3>예약 목록</h3>
                            <table className="UserDetailTable">
                                <thead>
                                    <tr>
                                        <th style={{ width: "10%" }}>ID</th>
                                        <th style={{ width: "40%" }}>도서명</th>
                                        <th style={{ width: "20%" }}>예약 시작일</th>
                                        <th style={{ width: "20%" }}>예약 마감일</th>
                                        <th>삭제</th>
                                        <th>기간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userRes.map((res) => (
                                        <UserResItem key={res.id} res={res} onClickToCancelRes={onClickToCancelRes} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div></div>

                        <div className='bottomTable'>
                            <h3>대출 목록</h3>
                            <table className="UserDetailTable">
                                <thead>
                                    <tr>
                                        <th style={{ width: "10%" }}>ID</th>
                                        <th style={{ width: "30%" }}>도서명</th>
                                        <th style={{ width: "20%" }}>대출 시작일</th>
                                        <th style={{ width: "20%" }}> 반납일</th>
                                        <th>상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userLoan.map((loan) => (
                                        <UserLoanItem key={loan.id} loan={loan} onClickToReturn={onClickToReturn} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='returnBtn' style={{ paddingTop: "5%" }}>
                        <button type="button" class="btn btn-outline-dark" onClick={() => navigate('/admin/user/search')}>목록보기</button>
                    </div> </div>

                    </div>
            
        </>
    );
};

export default AdminUserDetail;
