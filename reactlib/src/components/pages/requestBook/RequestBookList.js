import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestBookList = () => {
  const [requestBooks, setRequestBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8090/requestbook')
      .then(response => {
        setRequestBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the request books!', error);
      });
  }, []);

  return (
    <div>
      <h2>Requested Books</h2>
      <ul>
        {requestBooks.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} (ISBN: {book.isbn})<br />
            Publisher: {book.publisher}, Publication Date: {new Date(book.pubDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestBookList;
