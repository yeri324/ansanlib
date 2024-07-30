import axios from "axios";
import './NewbookList.css';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../common/Pagination';
import Header from '../../../fragments/header/header';
import Footer from '../../../fragments/footer/footer';
import BookImg from "../../book/searchBookList/bookImg";

const NewbookList = () => {
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalBookCount, setTotalBookCount] = useState(0);
    const itemPerPage = 8;

    useEffect(() => {
        onSearch(currentPage);
    }, [currentPage])

    // 도서 상세페이지 이동
    const onDetail = (id) => {
        navigate(`/book/detail/${id}`);
    }

    // 리스트 조회
    const onSearch = (page) => {
        axios(
            {
                url: '/newBook',
                method: 'post',
                data: {
                    page: page - 1,
                    size: itemPerPage,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((response) => {
            setSearchResult(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalBookCount(response.data.totalElements);
        });
    }

    return (
        <div>
            <div>
                <Header />
                <div class='all-newbooklist'>
                    <div class='boardnewbook-list'>
                        <h2>신규도서</h2>
                        <div className='pg-msg'>총 {totalBookCount}건 / {totalPages} 페이지</div>
                    </div>
                    <div>
                        <div class='newbook-list'>
                            {searchResult.map((carditem) => (
                                <div class='newBookItem'>
                                    <div className="newbook-img">
                                        <BookImg book={carditem} onClick={() => onDetail(carditem.id)} />
                                    </div>
                                    <div class="newbook-cont" >
                                        <ul>
                                            <li class="newbook-title" onClick={() => onDetail(carditem.id)}><h5>{carditem.title}</h5></li>
                                            <li>{carditem.author}</li>
                                            <li>{carditem.publisher} | {carditem.pub_date}</li>
                                            <li>소장 : {carditem.libName}</li>
                                            <li><button type="button" onClick={() => onDetail(carditem.id)}>자세히 보기</button> </li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default NewbookList;