import Footer from "../../../fragments/footer/footer";
import Header from "../../../fragments/header/header";
import { useParams } from "react-router-dom";
import AdminFaqDetailForm from "../faq/AdminFaqDetailForm";
import AdminNoticeDetailForm from "../notice/AdminNoticeDetailForm";
import UserFaqDetailForm from "../faq/UserFaqDetailForm";
import UserNoticeDetailForm from "../notice/UserNoticeDetailForm";
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';


// 디테일폼 구분 (권한 + 게시판)
const BoardDetail = ()=>{
    const { roles, board,id} = useParams();

    const renderContent = (roles, board, id) => {
        if (roles === "admin") {
           return board==="faq"?
           (
            <>
                <RedirectLogin />
                <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
                    <AdminFaqDetailForm id={id}/>
                </Auth>
            </>
        ):
        (
            <>
                <RedirectLogin />
                <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
                    <AdminNoticeDetailForm id={id}/>
                </Auth>
            </>
        )
            }
         else {
            return board==="faq"?<UserFaqDetailForm id={id}/>:<UserNoticeDetailForm id={id}/>
        }
    };

return (
    <>
    <Header />
    { renderContent(roles, board,id)}
    <Footer />
    </>
)

}
export default BoardDetail;
