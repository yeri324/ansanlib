import axios from 'axios';
import UserResItem from './UserResItem';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';



const AdminUserDetail = () => {
    const navigate = useNavigate();
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

    };

    const onClickToPenalty = () => {
        if(userDetail.status==="ONPENALTY"){alert("이미....")}
        else{
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

// const onClick = (e) => {
    
//         axios(
//         {
//             url: '/admin/user/BookRes',
//             method: 'delete',
//             data: {
//                 id: e.target.value,
//             },
//             baseURL: 'http://localhost:8090',
//         }
//     )
//     window.location.reload(navigate(`/admin/user/detail/${id}`, { repalce: true }));
// }
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
                 <UserResItem key={res.id} res={res} onClickToCancelRes={onClickToCancelRes} />
                 
                // <tr>
                //     <td>{res.id}</td>
                //     <td>{res.bookId.id}</td>
                //     <td>{res.startDate}</td>
                //     <td>{res.endDate}</td>
                //     <td><button value={res.id} onClick={onClickToCancelRes}>삭제</button></td>
                //     <td><button value={res.id}>기간연장</button></td>

                // </tr>
            ))}
        <button onClick={(e)=> onClickToPenalty(e)}>penalty</button>
        </div>
    );
};

export default AdminUserDetail;