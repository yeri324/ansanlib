import Footer from "../../../fragments/footer/footer";
import Header from "../../../fragments/header/header";
import { useParams } from "react-router-dom";
import AdminFaqList from "../faq/AdminFaqList";
import AdminNoticeList from "../notice/AdminNoticeList";
import UserFaqList from "../faq/UserFaqList";
import UserNoticeList from "../notice/UserNoticeList";

// 리스트 구분
const BoardList = () => {
    const { roles, board,} = useParams();

    const renderContent = (roles, board) => {
        if (roles === "admin") {
           return board==="faq"?<AdminFaqList/>:<AdminNoticeList/>
            }
         else {
            return board==="faq"?<UserFaqList/>:<UserNoticeList/>
        }
    };

    return (
        <>
            <Header />
            {renderContent(roles, board)}
            <Footer />
        </>
    )
}
export default BoardList;