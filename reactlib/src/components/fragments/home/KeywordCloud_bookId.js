import React, { useEffect, useState } from "react";
import axios from 'axios';

function KeywordCloud_bookId({ id }) {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (id && id !== 'undefined') { // Check if id is valid
            axios.get(`http://127.0.0.1:5001/api/wordcloud/${id}`, {
                responseType: 'blob',
                mode: 'cors'
            })
            .then(response => {
                if (response.status === 204) {
                    setImageSrc('');
                } else {
                    const imageObjectURL = URL.createObjectURL(response.data);
                    setImageSrc(imageObjectURL);
                }
            })
            .catch(error => {
                console.error('There was a problem with the Axios request:', error);
                setImageSrc('');
            });
        }
    }, [id]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
            <h1 style={{ textAlign: 'center' }}>책 상세 키워드</h1>
            {imageSrc && <img src={imageSrc} alt="Keyword Cloud" style={{ width: '100%', maxWidth: '700px', height: 'auto' }} />}
        </div>
    );
}

export default KeywordCloud_bookId;
