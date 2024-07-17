import Button from 'react-bootstrap/Button';

import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../common/Pagination';
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';
import AdminRecCard from './AdminRecCard';


function AdminRecList() {
    const { axios } = useAuth();
    const navigate = useNavigate();
    const { loginStatus, roles } = useAuth();
    const [searchResult, setSearchResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecCount, setTotalRecCount] = useState(0);
    const recPerPage = 8;

    useEffect(() => {
        if (loginStatus === LOGIN_STATUS.LOGGED_OUT) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        } else if (loginStatus === LOGIN_STATUS.LOGGED_IN) {
            //어드민인지 확인
            if (roles !== ROLES.ADMIN) {
                alert("권한이 없습니다.");
                navigate(-1);
            }
        }
        onSearch(currentPage);
    }, [loginStatus, currentPage])

    // 리스트 조회
    const onSearch = (page) => {
        console.log(currentPage, recPerPage);
        axios(
            {
                url: '/admin/recboard/list',
                method: 'post',
                data: {
                    page: page - 1,
                    size: recPerPage,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((response) => {
            console.log(response.data);
            setSearchResult(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalRecCount(response.data.totalElements);
        });
    }

    // 생성페이지 이동
    const onCreate = () => {
        navigate('/admin/recboard/form')
    }

    return (
        <div class='rec-list'>
        {searchResult.map((card)=>(
           <AdminRecCard card={card}/>
        ))}
         <button type='button' onClick={onCreate}>생성</button>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
        
    );
}

export default function() {
    return (
      <>
        <RedirectLogin />
        <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN} >
          <AdminRecList />
        </Auth>
      </>
    );
  };