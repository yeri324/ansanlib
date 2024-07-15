import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './KeywordCloud.css';


const KeywordCloud = ({ bookId }) => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/keywords/${bookId}`);
        setKeywords(response.data);
      } catch (error) {
        console.error('키워드 불러오기 오류:', error);
      }
    };

    fetchKeywords();
  }, [bookId]);

  return (
    <div className="keyword_cloud">
      {keywords.map((keyword, index) => (
        <span key={index} className="keyword_key">
          {keyword.keyword}
        </span>
      ))}
    </div>
  );
};

export default KeywordCloud;

