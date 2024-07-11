import React, { useContext } from "react";
import {LoginContext} from "../../security/contexts/LoginContextProvider";
// import axios from "axios";

function BoardItem({ item, onDetail, checkedList, checkHandler, }) {
    
    const { isLogin, roles } = useContext(LoginContext);

    // // 이미지 미리보기 (필요할때 주석 해제하기)
    // const [viewImg, setViewImg] = useState('');
    // const getBoardImage = async () => {
    //     console.log(faq.faqImgs[0].imgUrl);
    //     axios(
    //         {
    //             url: `/${board}/getImg`,
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
    //     getFaqImage()
    // }, [])
    // {/* 이미지 미리보기 필요시 주석 해제  + 시간 아래에 넣기 */ }
    // <td>
    //         <img key={faq.faqImgs} src={viewImg} style={{ width: '100px', height: '100px' }} />
    // </td>

    return (
            <tr>
                {console.log(roles)}
                <td>{item.id}</td>
                <td onClick={() => onDetail(item)}>{item.title}</td>
                <td>{item.createdBy}</td>
                <td>{item.updateTime.split('T')[0]}</td>
                {roles.isAdmin && (<td><input type='checkbox' id={item.id} checkedList={checkedList.includes(item.id)} onChange={(e) => checkHandler(e, item.id)} /></td>)}
            </tr>
    );
}

export default BoardItem;