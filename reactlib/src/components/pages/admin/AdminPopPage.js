import axios from "axios"
import { useState,useEffect } from "react"
import PopupItem from "./PopupItem";
import './Popup.css'; 
import PopupNewForm from "./PopupNewForm";

const AdminPopPage = () => {
    const [popupList , setPopupList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const getPopupList = async ()=>{
        const response = await axios.get('/admin/popup')
        console.log(response.data);
        setPopupList(response.data);
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    useEffect(()=>{
        getPopupList();
    },[]);

    return (
        <>
            <h2>팝업관리</h2>
            <div>
                <table>
                    <tr>
                        <td>title</td>
                        <td>startDate</td>
                        <td>endDate</td>
                        <td>status</td>
                    </tr>
                    {popupList.map((popup)=> (
                        <PopupItem key={popup.id} popup={popup}/>
                        )
                    )}
                </table>
            </div>
                    <button type='button' onClick={handleOpen}>팝업추가</button>
                    {isOpen && <PopupNewForm handleOpen={handleOpen} />}

        </>
    )
}
export default AdminPopPage