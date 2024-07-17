import Card from 'react-bootstrap/Card';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../common/Pagination';
import axios from 'axios';

function UserRecList () {
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

    // 디테일 이동 -- id 수정
    const onDetail = () => {
        navigate(`/book/detail/${card.book.id}`);
    }

    return(
        <div class='rec-list'>
        {searchResult.map((card)=>(
           <div class='card'>
           <Card  style={{ width: '18rem' }}>
               <div onClick={onDetail}>
               <div class='card-img'>
                   <Card.Img variant="top" src={viewImg} />
               </div>
               <Card.Body>
                   <Card.Title>{card.title}</Card.Title>
                   <Card.Text>
                       {card.content}
                   </Card.Text>
               </Card.Body>
               </div>
           </Card>
       </div>
        ))}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
}

export default UserRecList;