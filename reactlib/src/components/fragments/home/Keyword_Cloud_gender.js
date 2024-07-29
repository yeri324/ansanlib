import React, { useEffect, useState } from 'react';
import axios from 'axios';

function KeywordCloud_gender({ gender }) {
    const [imageSrc, setImageSrc] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWordCloud = async () => {
            try {
                console.log(`Fetching word cloud for gender: ${gender}`);  // gender 값 출력
                const response = await axios.get(`http://127.0.0.1:5001/api/wordcloud/${gender}`, {
                    responseType: 'blob',
                });
                const imageObjectURL = URL.createObjectURL(response.data);
                setImageSrc(imageObjectURL);
            } catch (error) {
                setError(error);
                console.error('There was a problem with the axios operation:', error);
            }
        };

        fetchWordCloud();
    }, [gender]);

    const displayGender = gender === 'MALE' ? '남성' : gender === 'FEMALE' ? '여성' : 'Unknown';

    return (
        <div>
            <h2>{displayGender}별 키워드 검색어</h2>
            {error && <p>Error loading image: {error.message}</p>}
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={`Keyword Cloud for ${displayGender}`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '400px',
                        objectFit: 'contain',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                    }}
                />
            )}
        </div>
    );
}

export default KeywordCloud_gender;
