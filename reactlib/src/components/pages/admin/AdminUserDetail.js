import axios from 'axios';
import UserResItem from './UserResItem';
import UserLoanItem from './UserLoanItem';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSide from './AdminSide';
import "./AdminUserDetail.css";


const AdminUserDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userDetail, setUserDetail] = useState({});
    const [userRes, setUserRes] = useState([]);
    const [userLoan, setUserLoan] = useState([]);
    const ResData = userRes && userRes.length > 0;
    const LoanData = userLoan && userLoan.length > 0;

    useEffect(() => {
        getDataset(id);
    }, [id]);

    const getDataset = (id) => {
        axios({
            url: '/admin/user/detail',
            method: 'post',
            data: { id },
        }).then((res) => {
            setUserDetail(res.data);
        }).catch((err) => {
            setUserDetail({});
        });

        axios({
            url: '/admin/user/getRes',
            method: 'post',
            data: { id },
        }).then((res) => {
            setUserRes(res.data);
        }).catch((err) => {
            setUserRes([]);
        });

        axios({
            url: '/admin/user/getLoan',
            method: 'post',
            data: { id },
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
                    data: { id },
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
                data: { id: e.target.value },
            }).then(() => {
                window.location.reload();
            });
        }
    };

    const onClickToReturn = (e) => {
        if (window.confirm('반납하시겠습니까?')) {
            axios({
                url: '/admin/user/return',
                method: 'delete',
                data: { id: e.target.value },
            }).then(() => {
                window.location.reload();
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
                data: { id },
            }).then(() => {
                alert("납부 완료");
                window.location.reload();
            });
        }
    };

    return (
        <>

            <div className="admin-page">
                <div className="admin-base">
                    <AdminHeader />
                    <AdminSide />
                </div>
                <main className="admin-Userdetail-main">
                    <div className="admin-Userdetail-body">
                        <div className="admin-Userdetail-title">
                            <h1> {userDetail.name} 님 상세 정보</h1>
                        </div>
                        <table className="admin-Userdetail-table">
                            <thead>
                                <tr className="admin-th-tr">
                                    <th style={{ width: "14%" }}>UserId</th>
                                    <th style={{ width: "14%" }}>Login ID</th>
                                    <th style={{ width: "14%" }}>이름</th>
                                    <th style={{ width: "14%" }}>Penalty</th>
                                    <th style={{ width: "14%" }}>패널티상태</th>
                                    <th style={{ width: "14%" }}>PenaltyDate</th>
                                    <th style={{ width: "14%" }}>LateFee</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='admin-td-tr' style={{ cursor: "default" }}>
                                    <td>{userDetail.userId}</td>
                                    <td>{userDetail.loginid}</td>
                                    <td>{userDetail.name}</td>
                                    <td>{userDetail.penalty}</td>
                                    <td>{userDetail.status}</td>
                                    <td>{userDetail.penaltyDate}</td>
                                    <td>{userDetail.lateFee}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="admin-userDetail-button">
                            <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={onClickToPenalty}>제재하기</button>
                            <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={onClickToPay}>납부 완료</button>
                        </div>
                        <div className="admin-Userdetail-bottom">
                            <div className="admin-Userdetail-res">
                                <h3 style={{ marginLeft: "30px" }}>예약 목록</h3>
                                <table className="admin-Userdetail-table">
                                    <thead>
                                        <tr className='admin-th-tr'>
                                            <th>ID</th>
                                            <th>도서명</th>
                                            <th>예약 시작일</th>
                                            <th>예약 마감일</th>
                                            <th>삭제</th>
                                            <th>기간</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ResData ? (
                                            userRes.map((res) => (
                                                <UserResItem key={res.id} res={res} onClickToCancelRes={onClickToCancelRes} />
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5">목록이 없습니다</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="admin-Userdetail-loan">
                                <h3 style={{ marginLeft: "30px" }}>대출 목록</h3>
                                <table className="admin-Userdetail-table">
                                    <thead>
                                        <tr className='admin-th-tr' >
                                            <th>ID</th>
                                            <th>도서명</th>
                                            <th>대출 시작일</th>
                                            <th>반납일</th>
                                            <th>상태</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {LoanData ? (
                                            userLoan.map((loan) => (
                                                <UserLoanItem key={loan.id} loan={loan} onClickToReturn={onClickToReturn} />
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5">목록이 없습니다</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='admin-return-btn'>
                            <button type='button' id="adminbtn" className="btn btn-outline-dark" onClick={() => navigate('/admin/user/search')}>돌아가기</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AdminUserDetail;
