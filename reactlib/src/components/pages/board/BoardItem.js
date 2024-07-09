import React, { useEffect, useState } from "react";
import axios from "axios";

function BoardItem({ board, onDetail, checkedList, checkHandler }) {

    // // 이미지 미리보기 필요하면 주석 해제하기
    // const [viewImg, setViewImg] = useState('');
    // const getBoardImage = async () => {
    //     console.log(board.boardImgs[0].imgUrl);
    //     axios(
    //         {
    //             url: '/board/getImg',
    //             method: 'post',
    //             data: {
    //                 imgUrl: board.boardImgs[0].imgUrl
    //             },
    //             baseURL: 'http://localhost:8090',
    //             responseType: 'arraybuffer',
    //         }
    //     ).then((response) => {
    //         const blob = new Blob([response.data], { type: 'image/jpeg' });
    //         const imageUrl = URL.createObjectURL(blob);
    //         setViewImg(imageUrl)
    //     });
    // }
    // //페이지 로드될때 이미지 나오게하기
    // useEffect(() => {
    //     getBoardImage()
    // }, [])
    // {/* 이미지 볼때 주석 해제 */}
    // {<td>
    //     <img key={board.boardImgs} src={viewImg} style={{ width: '100px', height: '100px' }} />
    // </td>}

    return (
        <tr>
            <td><input type='checkbox' id={board.id} checkedList={checkedList.includes(board.id)} onChange={(e) => checkHandler(e, board.id)} /></td>
            <td>{board.id}</td>
            <td onClick={() => onDetail(board)}>{board.title}</td>
            <td>{board.createdBy}</td>
            <td>{board.updateTime.split('T')[0]}</td>
        </tr>
    );
}
export default BoardItem;