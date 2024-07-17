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

    const onDelete = () => {
        if (window.confirm('삭제 하시겠습니까?')) {
            axios(
                {
                    url: '/admin/recboard/delete',
                    method: 'delete',
                    data: {
                        id: card.id,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/admin/recboard/list", { repalce: true }));
        }
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
            <Card  style={{ width: '18rem' }}>
                <div onClick={onDetail}>
                <div class='card-img'>
                    <Card.Img variant="top" src={viewImg} />
                </div>
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>
                        {card.content}
                    </Card.Text>
                </Card.Body>
                </div>
                <button type='button' onClick={onDelete}>삭제</button>
            </Card>
        </div>
    )
}

export default AdminRecCard;