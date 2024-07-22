import Footer from "../../../fragments/footer/footer";
import Header from "../../../fragments/header/header";
import { useParams } from "react-router-dom";
import AdminFaqList from "../faq/AdminFaqList";
import AdminNoticeList from "../notice/AdminNoticeList";
import UserFaqList from "../faq/UserFaqList";
import UserNoticeList from "../notice/UserNoticeList";
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';

// 리스트 구분
const BoardList = () => {
    const { roles, board, } = useParams();

    const renderContent = (roles, board,) => {
        if (roles === "admin") {
            return board === "faq" ? (<>
                <RedirectLogin />
                <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
                    <AdminFaqList />
                </Auth>
            </>) :

                (<>
                    <RedirectLogin />
                    <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
                        <AdminNoticeList />
                    </Auth>
                </>)
        }
        else {
            return (<> <Header />
                {board === "faq" ? <UserFaqList /> : <UserNoticeList />}
                <Footer /></>)
        }
    };

    return (
        <>
            {renderContent(roles, board)}
        </>
    )
}
export default BoardList;