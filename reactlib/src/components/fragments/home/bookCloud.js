import React, { useEffect, useState } from 'react';
import WordCloud from 'react-d3-cloud';
import axios from 'axios';

const BookCloud = ({ query }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (query) {
      axios.get(`/api/books/search?query=${query}`)
        .then(response => {
          const books = response.data;
          const genreCounts = {};
          const authorCounts = {};

          books.forEach(book => {
            if (genreCounts[book.genre]) {
              genreCounts[book.genre] += 1;
            } else {
              genreCounts[book.genre] = 1;
            }

            if (authorCounts[book.author]) {
              authorCounts[book.author] += 1;
            } else {
              authorCounts[book.author] = 1;
            }
          });

          const formattedData = [
            ...Object.entries(genreCounts).map(([text, value]) => ({ text, value })),
            ...Object.entries(authorCounts).map(([text, value]) => ({ text, value })),
          ];
          
          setData(formattedData);
        });
    }
  }, [query]);

  const fontSizeMapper = word => Math.log2(word.value) * 5;

  return (
    <div>
      <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        width={800}
        height={400}
      />
    </div>
  );
};

export default BookCloud;
