import Card from 'react-bootstrap/Card';
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
        <div class='card'>
            <Card>
                <div onClick={onDetail}>
                <div class='card-img'>
                    <Card.Img variant="top" src={viewImg} />
                </div>
                <Card.Body class='card-body'>
                    <Card.Title class='title'>{card.title}</Card.Title>
                    <Card.Text class='content'>{card.content}</Card.Text>
                </Card.Body>
                </div>
            </Card>
        </div>
    )
}

export default AdminRecCard;