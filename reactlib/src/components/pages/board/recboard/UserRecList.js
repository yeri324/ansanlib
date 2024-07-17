import Card from 'react-bootstrap/Card';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../common/Pagination';
import axios from 'axios';
import AdminRecCard from './AdminRecCard';

function UserRecList () {
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
            setSearchResult(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalRecCount(response.data.totalElements);
        });
    }

    return(
        <div class='rec-list'>
        {searchResult.map((card)=>(
           <div class='card'>
           <AdminRecCard card={card}/>
       </div>
        ))}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}

export default UserRecList;