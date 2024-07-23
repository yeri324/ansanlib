import React from 'react';
import './Highlight.css'; // 하이라이트 스타일 파일을 임포트합니다.

const Highlight = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span className="High">
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="highlight">{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export default Highlight;
    