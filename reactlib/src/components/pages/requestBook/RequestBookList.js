import React, { useState, useEffect } from 'react';
import useRealName from '../../hooks/useRealName';
import useAuth,{ LOGIN_STATUS } from '../../hooks/useAuth';
import Auth from '../../helpers/Auth';
import RedirectLogin from '../../helpers/RedirectLogin';
import Header from '../../fragments/header/header';
import Footer from '../../fragments/footer/footer';
import Side from '../myPage/Side';
import './RequestBookList.css';

const RequestBookList = () => {
  const name = useRealName();

  const { axios } = useAuth();

  const [requestBooks, setRequestBooks] = useState([]);
  const [selectedRequestBooks, setSelectedRequestBooks] = useState([]);
  const [isErrored, setErrored] = useState(false);

  const fetchRequestBook  = async () => {
    try {
      const response = await axios.get(`/api/requestbook/get`);
      setRequestBooks(response.data);
      setErrored(false);
    } catch(error) {
      setErrored(true);
      console.error('There was an error fetching the request books!', error);
    } 
  };

  useEffect(()=>{ fetchRequestBook(); }, []);

  const handleSelectRequestBook =(requestBookId)=>{
    setSelectedRequestBooks(prevSelected=>
      prevSelected.includes(requestBookId)
        ? prevSelected.filter(id => id !== requestBookId)
        : [...prevSelected, requestBookId]
    );
  };

  const handleDeleteRequestBook = async()=>{
    try{
      await Promise.all(selectedRequestBooks.map(id =>
          axios.delete(`/api/requestbook/delete/${id}`)
      ));
      alert('선택한 도서가 삭제되었습니다.');
      setRequestBooks(requestBooks.filter(requestBook => !selectedRequestBooks.includes(requestBook.id)));
      setSelectedRequestBooks([]);
    } catch (error){
      console.error('도서 삭제 중 오류 발생',error);
;      alert('희망도서 삭제 중 오류가 발생하였습니다. ');
    }
  };

  const deselectAll = () => setSelectedRequestBooks([]);

  const selectAll = () => setSelectedRequestBooks(requestBooks.map(({id}) => id));

  return (
    <div className="mypage-container">
        <div className='mypage-header'>
            <h2 className='mypage-header-name'>{name}님의 도서 신청 목록</h2>
        </div>
        <div className="request_books_list">
            <table>
                <thead>
                    <tr>
                        <th>책 제목</th>
                        <th>저자</th>
                        <th>ISBN</th>
                        <th>출판사</th>
                        <th>출판일</th>
                        <th>신청한 도서관</th>
                        <th style={{ width: '60px' }}>선택</th>
                    </tr>
                </thead>
                <tbody>
                    {requestBooks.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td>{book.publisher}</td>
                            <td>{new Date(book.pub_date).toLocaleDateString()}</td>
                            <td>{book.lib_name}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRequestBooks.includes(book.id)}
                                    onChange={() => handleSelectRequestBook(book.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!isErrored && (
              <div className='actions-container'>
                <div className="actions">
                    <button
                        onClick={selectAll}
                        disabled={selectedRequestBooks.length === requestBooks.length}
                    >
                        전체 선택
                    </button>
                    <button
                        onClick={deselectAll}
                        disabled={selectedRequestBooks.length === 0}
                    >
                        전체 선택해제
                    </button>
                    <button
                        onClick={handleDeleteRequestBook}
                        disabled={selectedRequestBooks.length === 0}
                    >
                        삭제
                    </button>
                </div>
              </div>  
            )}
            {isErrored && <h2 className="error_message">신청한 도서가 없습니다.</h2>}
        </div>
    </div>
  );  
};

export default function() {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
      <Header />
        <div className="MyPage-body">
          <Side />
          <RequestBookList  />
        </div>
        <Footer />
      </Auth>
    </>
  );
};

