import React, { useEffect, useState} from "react";
import {useParams} from 'react-router-dom';


function KeywordCloud_bookId() {
    const {bookId} = useParams();
    const [imageSrc, setImageSrc] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:5001/api/wordcloud/${bookId}`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageSrc(imageObjectURL);
        })
        .catch(error => {
            setError(error);
            console.error('There was a problem with the fetch operation:', error);
        });
    }, [bookId]);

    return (
        <div>
            <h1>Keyword Cloud_bookid</h1>
            {error && <p>Error loading image: {error.message}</p>}
            {imageSrc && <img src={imageSrc} alt="Keyword Cloud" />}
        </div>
    );
}

export default KeywordCloud_bookId;
