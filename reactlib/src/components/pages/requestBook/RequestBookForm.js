import React, { useState } from 'react';
import axios from 'axios';

const RequestBookForm = () => {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pubDate, setPubDate] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

  const requestBook = {
      isbn, title, author, publisher,
      pubDate, userId: parseInt(userId)
  };

    axios.post('/api/requestbook', requestBook, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Book request created:', response.data);
      alert('신청되었습니다.');
      setIsbn('');
      setTitle('');
      setAuthor('');
      setPublisher('');
      setPubDate('');
      setUserId('');
    })
    .catch(error => {
      console.error('There was an error creating the book request!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ISBN:</label>
        <input 
          type="text" 
          value={isbn} 
          onChange={(e) => setIsbn(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Author:</label>
        <input 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Publisher:</label>
        <input 
          type="text" 
          value={publisher} 
          onChange={(e) => setPublisher(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Publication Date:</label>
        <input 
          type="date" 
          value={pubDate} 
          onChange={(e) => setPubDate(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>User ID:</label>
        <input 
          type="text" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestBookForm;
