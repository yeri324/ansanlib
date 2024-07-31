import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminRecCard({ card }) {
    const navigate = useNavigate();
    const [viewImg, setViewImg] = useState("")

    const onDetail = () => {
        navigate(`/book/detail/${card.book.id}`);
    }

    const getBookImg = () => {
        axios(
            {
                url: `/getImg`,
                method: 'post',
                data: {
                    imgUrl: card.book.bookImg.imgUrl,
                },
                baseURL: 'http://localhost:8090',
                responseType: 'arraybuffer',
            }
        ).then((response) => {
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
            setViewImg(imageUrl)
        });
    }

    useEffect(() => {
        getBookImg();
    }, [])

    return (
        <div class="cur_cont" onClick={onDetail}>
            <img src={viewImg} class="card-img-top" />
            <div class="card-body">
                <h5 class="card-title">{card.title}</h5>
                <p class="card-text">{card.content}</p>
            </div>
        </div>
    )
}

export default AdminRecCard;