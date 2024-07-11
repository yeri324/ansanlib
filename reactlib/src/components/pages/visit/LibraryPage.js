import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LibraryPage.css';

const LibraryPage = () => {
  const [visitCount, setVisitCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recordVisitAndFetchCount = async () => {
      try {
        // 방문 기록 저장
        await axios.post('http://localhost:8090/api/visits', {
          page: 'LibraryPage',
        });

        // 방문 수 가져오기
        const response = await axios.get('http://localhost:8090/api/visits/count');
        setVisitCount(response.data);
      } catch (error) {
        console.error('Failed to record visit or fetch visit count', error);
      } finally {
        setLoading(false);
      }
    };

    recordVisitAndFetchCount();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>도서관 방문자 수</h1>
      <p>TOTAL: {visitCount}</p>
      {/* Your library content */}
    </div>
  );
};

export default LibraryPage;
