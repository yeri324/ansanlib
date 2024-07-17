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
    const [searchResult, setSearchResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalRecCount, setTotalRecCount] = useState(0);
    const recPerPage = 8;

    useEffect(() => {
        onSearch(currentPage);
    }, [currentPage])

    // 리스트 조회
    const onSearch = (page) => {
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

    // 삭제
    const onDelete = (e) => {
        if (window.confirm('삭제 하시겠습니까?')) {
            axios(
                {
                    url: '/admin/recboard/delete',
                    method: 'delete',
                    data: {
                        id: e,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/admin/recboard/list", { repalce: true }));
        }
       }

    return (
        <div class='rec-list'>
        {searchResult.map((card)=>(
            <div class='card'>
           <AdminRecCard card={card} />
           <button type='button' onClick={() => onDelete(card.id)}>삭제</button>
           </div>
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