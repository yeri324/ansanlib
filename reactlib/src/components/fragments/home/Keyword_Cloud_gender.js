import React, { useEffect, useState } from 'react';
import axios from 'axios';

function KeywordCloud_gender({ gender }) {
    const [imageSrc, setImageSrc] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWordCloud = async () => {
            try {
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

    return (
        <div>
            <h1>Keyword Cloud for {gender}</h1>
            {error && <p>Error loading image: {error.message}</p>}
            {imageSrc && <img src={imageSrc} alt={`Keyword Cloud for ${gender}`} />}
        </div>
    );
}

export default KeywordCloud_gender;
