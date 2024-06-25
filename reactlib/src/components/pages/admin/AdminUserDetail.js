import axios from 'axios';
import UserResItem from './UserResItem';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const AdminUserDetail = () => {
    const { id } = useParams();
    const [userDetail, setUserDetail] = useState({});
    const [userRes, setUserRes] = useState([]);

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
                baseURL: 'http://localhost:8090',
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

        // axios(
        //     {
        //       url: '/admin/user/detail',
        //       method: 'post',
        //       data: {
        //         id: id,
        //     },
        //       baseURL: 'http://localhost:8090',
        //     }
        //   ) .then((res) => {
        //     setUserDetail(res.data);
        // })
        // .catch((err) => {
        //     setUserDetail([]);
        // });  

    };

    const onClickToPenalty = () => {
        if (window.confirm('수정 하시겠습니까?')) {axios(
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

    // function onUpdate() {
        //     if (window.confirm('수정 하시겠습니까?')) {
        //         axios(
        //             {
        //                 url: `/faq/detail/${id}`,
        //                 method: 'put',
        //                 data: {
        //                     id: id,
        //                     title: title,
        //                     content: content,
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
            <p>userDetail</p>
            {console.log(userDetail)}
            <p>{userDetail.loginid}</p>
            <p>{userDetail.userId}</p>
            <p>{userDetail.penalty}</p>
            <p>{userDetail.lateFee}</p>
            <p>{userDetail.name}</p>
            <p>{userDetail.status}</p>
            <p>penaltyDate</p>
            <p>{userDetail.penaltyDate}</p>
        
            <p>userRes</p>

            {console.log(userRes)}
            {userRes.map((res) => (
                <tr>
                    <td>{res.id}</td>
                    <td>{res.bookId.id}</td>
                    <td>{res.startDate}</td>
                    <td>{res.endDate}</td>

                </tr>
            ))}
<button onClick={onClickToPenalty}>penalty</button>




        </div>
    );
};

export default AdminUserDetail;