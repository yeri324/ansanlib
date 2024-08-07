import { useParams } from "react-router-dom";
import AdminFaqForm from "../faq/AdminFaqForm";
import AdminNoticeForm from "../notice/AdminNoticeForm";

// 생성 폼 구분
const BoardForm =()=>{
    const { board,} = useParams();

    const renderContent = (board) => {
           return board==="faq"?<AdminFaqForm/>:<AdminNoticeForm/>
    };

    return (
        <>
            {renderContent(board)}
        </>
    )
}
export default BoardForm;