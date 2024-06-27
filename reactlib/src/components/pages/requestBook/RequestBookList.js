import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RequestBookList = () => {
  const { userId} =useParams();
  const [requestBooks, setRequestBooks] = useState([]);
  const [isErrored, setErrored] =useState(false);
  
  useEffect(async () => {
    try{
        const response = await axios.get(`/api/requestbook/get/by-user/${userId}`);
        setRequestBooks(response.data);
    } catch(error){
        setErrored(true);
        console.error('There was an error fetching the request books!', error);
    }
  },  [userId]);


  return (
    <div>
      <h2>Requested Books</h2>
      {requestBooks.length > 0 ?(
      <ul>
        {requestBooks.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} (ISBN: {book.isbn})<br />
            Publisher: {book.publisher}, Publication Date: {new Date(book.pub_date).toLocaleDateString()}
          </li>
        ))}
      </ul>
      ) : (
        <p>신청한 도서가 없습니다.</p>
      )}
    </div>
  );
};

export default RequestBookList;
