import axios from "axios"
import { useState, useEffect } from "react"
import PopupItem from "../item/PopupItem";
import './AdminPopup.css';

import PopupNewForm from "./PopupNewForm";
import AdminHeader from "../common/AdminHeader";
import AdminSide from "../common/AdminSide";

const AdminPopPage = () => {
    const [popupList, setPopupList] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const getPopupList = async () => {
        const response = await axios.get('/admin/popup')
        console.log(response.data);
        setPopupList(response.data);
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
                    <button type="button" class="btn btn-primary" onClick={()=>setIsAddOpen(true)}>팝업 추가</button>
                 
                 {isAddOpen && <PopupNewForm setIsAddOpen={setIsAddOpen} />}
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
             
                       
                    </div>
                    </div>
            </main>
        </div>

    )
}
export default AdminPopPage