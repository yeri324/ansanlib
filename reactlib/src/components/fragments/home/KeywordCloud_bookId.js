import React, { useEffect, useState } from "react";
import axios from 'axios';

function KeywordCloud_bookId({ bookId }) {
    const [imageSrc, setImageSrc] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:5001/api/wordcloud/${bookId}`, {
            responseType: 'blob',
            mode: 'cors'
        })
        .then(response => {
            const imageObjectURL = URL.createObjectURL(response.data);
            setImageSrc(imageObjectURL);
        })
        .catch(error => {
            setError(error);
            console.error('There was a problem with the Axios request:', error);
        });
    }, [bookId]);

    return (
        <div>
            <h1>Keyword Cloud</h1>
            {error && <p>Error loading image: {error.message}</p>}
            {imageSrc && <img src={imageSrc} alt="Keyword Cloud" />}
        </div>
    );
}

export default KeywordCloud_bookId;
