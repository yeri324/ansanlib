import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSide from './AdminSide';
import "./AdminPage.css";
import AdminPagination from './AdminPagination';
import AdminBookDetail from './AdminBookDetail';

const AdminBookList = () => {
  const [bookList, setBookList] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('library');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchYear, setSearchYear] = useState(null);
  const [filteredBookList, setFilteredBookList] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
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
      const response = await axios.get('http://localhost:8090/api/admin/book/list');
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
      const key = `${book.isbn}-${book.title}-${book.author}-${book.publisher}-${book.pub_date}`;
      if (!acc[key]) {
        acc[key] = { ...book, total_count: 0, libraries: [] };
      }
      acc[key].total_count += book.count;
      acc[key].libraries.push({ lib_name: book.lib_name, count: book.count });
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
        book.libraries.some(lib => lib.lib_name.toLowerCase().includes(searchTerm.toLowerCase()))
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
    setSelectedBooks([]); // Clear the selected books
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

  const handleCheckboxChange = (book) => {
    setSelectedBooks(prevSelectedBooks => {
      if (prevSelectedBooks.includes(book)) {
        return prevSelectedBooks.filter(selectedBook => selectedBook !== book);
      } else {
        return [...prevSelectedBooks, book];
      }
    });
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
              <h1>도서 조회</h1>
            </div>

            <div className="admin-page-search">
              <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
                <option value="library">도서관 이름</option>
                <option value="title">도서 제목</option>
                <option value="author">작가</option>
                <option value="publisher">출판사</option>
                <option value="date">출판 년도</option>
              </select>

              {searchCriteria !== 'date' && (
                <input
                  type="text"
                  placeholder={`${
                    searchCriteria === 'library'
                      ? '도서관 이름'
                      : searchCriteria === 'title'
                      ? '도서 제목'
                      : searchCriteria === 'author'
                      ? '작가'
                      : '출판사'
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

            <div className="admin-page-button">
              <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/admin/book/new')}>등록하기</button>

            </div>

            <table className="admin-table">
              <thead>
                <tr className="admin-th-tr">
   
                  <th>No</th>
               
                  <th className='sortable' onClick={() => handleSort('isbn')}>ISBN</th>
                  <th className='sortable' onClick={() => handleSort('title')}>도서 제목</th>
                  <th className='sortable' onClick={() => handleSort('author')}>작가</th>
                  <th className='sortable' onClick={() => handleSort('publisher')}>출판사</th>
                  <th className='sortable' onClick={() => handleSort('pub_date')}>출판년도</th>
                  <th>도서 수량</th>
               
                </tr>
              </thead>
              <tbody>
                {filteredBookList.length > 0 ? (
                  filteredBookList.map((book, index) => (
                    <tr className='list admin-td-tr' key={index}>
                    
                      <td onClick={() => handleOpenModal(book)}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                 
                      <td onClick={() => handleOpenModal(book)}>{book.isbn}</td>
                      <td onClick={() => handleOpenModal(book)}>{book.title}</td>
                      <td onClick={() => handleOpenModal(book)}>{book.author}</td>
                      <td onClick={() => handleOpenModal(book)}>{book.publisher}</td>
                      <td onClick={() => handleOpenModal(book)}>{book.pub_date}</td>
                      <td onClick={() => handleOpenModal(book)}>{book.total_count}</td>
                     
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">도서 목록이 없습니다</td>
                  </tr>
                )}
              </tbody>
            </table>
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
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminBookList;
