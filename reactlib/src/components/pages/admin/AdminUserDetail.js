import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const AdminUserDetail = ()=>{
    const location = useLocation();
    const userInfo = {...location.state};
    const {id} = useParams();
    const [userDetail, setUserDetail] = useState();
    const [getUserName, setGetUserName] = useState(userInfo.name);

    useEffect(() => {
        getDataset();
    }, []);

    const getDataset = () => {
        axios.get(`/admin/user/detail/${id}`)
            .then((res) => {
                setUserDetail(res.data);
            })
            .catch((err) => {
                setUserDetail([]);
            });
    };

   

    return (
        <div>
            <p>userDetail.loginid</p>
            <p>{getUserName}</p>
            <p>userDetail.name</p>
        </div>
    );
};

export default AdminUserDetail;