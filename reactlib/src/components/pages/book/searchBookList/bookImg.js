import { useState,useEffect } from "react";
import axios from "axios";

const BookImg =({book})=>{
    const [bookUrl,setBookUrl] = useState("");

    const handleGetImg = async (book) => {
        const response = await axios.post('/getImg',{imgUrl : book.bookImg.imgUrl}, {responseType: 'arraybuffer'});
        const blob = new Blob([response.data], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setBookUrl(imageUrl);
      }

      useEffect(()=>{
        handleGetImg(book);
      },[])
    return (
        <>
        <img src={bookUrl} alt="책 이미지" className="img-fluid cover-img" />
        </>
    );

}
export default BookImg;