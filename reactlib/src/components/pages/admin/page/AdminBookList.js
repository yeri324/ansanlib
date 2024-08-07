import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../common/AdminHeader';
import AdminSide from '../common/AdminSide';
import "./AdminPage.css";
import AdminPagination from '../common/AdminPagination';
import AdminBookDetail from '../modal/AdminBookDetail';
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';
import AdminBookListTable from '../item/AdminBookListTable';

const AdminBookList = () => {
  const { axios } = useAuth();
  const [bookList, setBookList] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchYear, setSearchYear] = useState(null);
  const [filteredBookList, setFilteredBookList] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    getBookList();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setFilteredBookList(bookList.slice(start, end));
  }, [bookList, currentPage]);

  const getBookList = async () => {
    try {
      const response = await axios.get('/api/admin/book/list');
      if (Array.isArray(response.data)) {
        groupBooks(response.data);
      } else {
        console.error('Fetched data is not an array:', response.data);
        setBookList([]);
        setFilteredBookList([]);
      }
    } catch (error) {
      console.error('Error fetching book list:', error);
      setBookList([]);
      setFilteredBookList([]);
    }
  };

  const groupBooks = (data) => {
    const grouped = data.reduce((acc, book) => {
      const key = `${book.isbn}`;
      if (!acc[key]) {
        acc[key] = { ...book, total_count: 0, libraries: [] };
      }
      acc[key].total_count += book.count;
      acc[key].libraries.push({ libName: book.libName, count: book.count });
      return acc;
    }, {});
    const groupedArray = Object.values(grouped);
    setBookList(groupedArray);
    setFilteredBookList(groupedArray.slice(0, itemsPerPage));
  };

  const handleSearch = () => {
    let filteredList = bookList;
    if (searchCriteria === 'library') {
      filteredList = bookList.filter(book =>
        book.libraries.some(lib => lib.libName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else if (searchCriteria === 'title') {
      filteredList = bookList.filter(book =>
        book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchCriteria === 'author') {
      filteredList = bookList.filter(book =>
        book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchCriteria === 'publisher') {
      filteredList = bookList.filter(book =>
        book.publisher && book.publisher.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (searchCriteria === 'date') {
      filteredList = bookList.filter(book =>
        book.pub_date && book.pub_date.startsWith(searchYear ? searchYear.getFullYear().toString() : '')
      );
    }
    setFilteredBookList(filteredList.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setSearchYear(null);
    setFilteredBookList(bookList.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const handleLatestSort = () => {
    const sortedData = [...bookList].sort((a, b) => b.id - a.id); // ID 기준으로 내림차순 정렬
    setBookList(sortedData);
    setFilteredBookList(sortedData.slice(0, itemsPerPage));
    setCurrentPage(1); // 페이지를 1번으로 이동
  };

  const sortData = (key, direction) => {
    const sortedData = [...filteredBookList].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setFilteredBookList(sortedData);
  };

  const handleOpenModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const refreshBookList = () => {
    getBookList();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(bookList.length / itemsPerPage);

  return (
    <>
      <div className="admin-page">
        <div className="admin-base">
          <AdminHeader />
          <AdminSide />
        </div>

        <main className="admin-page-main">
          <div className="admin-page-body">
            <div className="admin-page-title">
              <h2>도서 조회</h2>
            </div>

            <div className='admin-page-top'>
              <div style={{ width: "25%" }}></div>
              <div className="admin-page-search" style={{ width: "50%" }}>
                <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
                  <option value="title">도서 제목</option>
                  <option value="author">작가</option>
                  <option value="publisher">출판사</option>
                  <option value="date">출판 년도</option>
                </select>

                {searchCriteria !== 'date' && (
                  <input
                    type="text"
                    placeholder={`${searchCriteria === 'title'
                      ? '도서 제목'
                      : searchCriteria === 'author'
                        ? '작가'
                        : searchCriteria === 'publisher'
                          ? '출판사'
                          : ''
                      }을 입력하세요`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                )}

                {searchCriteria === 'date' && (
                  <DatePicker
                    selected={searchYear}
                    onChange={(date) => setSearchYear(date)}
                    dateFormat="yyyy"
                    showYearPicker
                    placeholderText="날짜를 선택하세요"
                    onKeyDown={handleKeyDown}
                  />
                )}

                <button type="button" className="btn btn-outline-dark" onClick={handleSearch}>검색</button>
                <button type="button" className="btn btn-outline-dark" onClick={handleRefresh}>새로고침</button>
              </div>

              <div className="admin-page-button" style={{ width: "25%" }}>
                <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/admin/book/new')}>등록하기</button>
                <button type="button" className="btn btn-outline-dark" onClick={handleLatestSort}>최신순</button>
              </div>
            </div>

            <AdminBookListTable
              books={filteredBookList}
              onOpenModal={handleOpenModal}
              onSort={handleSort}
              sortConfig={sortConfig}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />

            <div className="admin-pagination">
              <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </div>

            {isModalOpen && (
              <AdminBookDetail
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                book={selectedBook}
                refreshBookList={refreshBookList}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <AdminBookList />
      </Auth>
    </>
  );
}
