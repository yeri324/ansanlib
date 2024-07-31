import axios from "axios";
import { useState, useEffect } from "react";
import PopupItem from "../item/PopupItem";
import './AdminPopup.css';
import PopupNewForm from "./PopupNewForm";
import AdminHeader from "../common/AdminHeader";
import AdminSide from "../common/AdminSide";
import AdminPagination from '../common/AdminPagination'; // Import AdminPagination

const AdminPopPage = () => {
    const [popupList, setPopupList] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 10; // Items per page

    const getPopupList = async () => {
        const response = await axios.get('/popup/admin')
        setPopupList(response.data);
    }

    useEffect(() => {
        getPopupList();
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = popupList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(popupList.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="admin-page">
            <div className="admin-base">
                <AdminHeader />
                <AdminSide />
            </div>
            <main className="admin-page-main">
                <div className="admin-page-body popupPage">
                    <div className="admin-page-title">
                        <h2>팝업 관리</h2>
                    </div>

                    <div className="container">
                        <button type="button" className="btn btn-primary" onClick={() => setIsAddOpen(true)}>팝업 추가</button>
                        {isAddOpen && <PopupNewForm setIsAddOpen={setIsAddOpen} />}
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>제목</th>
                                    <th>시작일</th>
                                    <th>종료일</th>
                                    <th>상태</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((popup) => (
                                    <PopupItem key={popup.id} popup={popup} />
                                ))}
                            </tbody>
                        </table>

                        <div className="admin-pagination">
                            <AdminPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                paginate={paginate}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default AdminPopPage;
