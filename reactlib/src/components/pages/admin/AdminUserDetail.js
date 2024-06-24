import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const AdminUserDetail = () => {
    const { id } = useParams();
    const [userDetail, setUserDetail] = useState();

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
          ) .then((res) => {
            setUserDetail(res.data);
        })
        .catch((err) => {
            setUserDetail([]);
        });  

    };



    return (
        <div>
            <p>userDetail.loginid</p>
            {console.log(userDetail)}

            <p>userDetail.name</p>
        </div>
    );
};

export default AdminUserDetail;