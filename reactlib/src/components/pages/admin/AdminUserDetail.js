import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const AdminUserDetail = ()=>{
    const {id} = useParams();
    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        getDataset();
    }, []);

    const getDataset = () => {
        axios.get(`/admin/user/detail/${id}`)
            .then((res) => {
                setUserDetail(res.data);
                console(userDetail);
            })
            .catch((err) => {
                setUserDetail([]);
            });
    };

   

    return (
        <div>
            <p>userDetail.loginid</p>
            {/* <p>{userDetail.loginid}</p> */}
            <p>userDetail.name</p>
        </div>
    );
};

export default AdminUserDetail;