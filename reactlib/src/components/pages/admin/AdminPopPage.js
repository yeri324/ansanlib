import axios from "axios"
import { useState, useEffect } from "react"
import PopupItem from "./PopupItem";
import './Popup.css';
import PopupNewForm from "./PopupNewForm";
import AdminHeader from "./AdminHeader";
import AdminSide from "./AdminSide";

const AdminPopPage = () => {
    const [popupList, setPopupList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const getPopupList = async () => {
        const response = await axios.get('/admin/popup')
        console.log(response.data);
        setPopupList(response.data);
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        getPopupList();
    }, []);

    return (
        <div className="admin-page">


            <div className="admin-base">
                <AdminHeader />
                <AdminSide />
            </div>
            <main className="admin-page-main">
                <div className="admin-page-body popupPage">
                    <div className="admin-page-title">
                        <h1>팝업 관리</h1>
                    </div>

                    <div class="container">
                        <table class="table table-bordered">
                            <thead class="thead-dark">
                                <tr>
                                    <th>제목</th>
                                    <th>시작일</th>
                                    <th>종료일</th>
                                    <th>상태</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {popupList.map((popup) => (
                                    <PopupItem key={popup.id} popup={popup} />
                                ))}
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-primary" onClick={handleOpen}>팝업 추가</button>
                        {isOpen && <PopupNewForm handleOpen={handleOpen} />}
                    </div>
                    </div>
            </main>
        </div>

    )
}
export default AdminPopPage