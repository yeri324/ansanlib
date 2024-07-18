import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopupForm from "./PopupForm";

const PopupItem = ({ popup }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    const onDeletePop = async () => {
        await axios.delete(`/admin/popup/${popup.id}`);
        window.location.reload(navigate("/admin/popup", { repalce: true },));
    }

    const openForm = () => {
        setIsOpen(true);
    };

    return (
        <>
            <tr>
                <td  onClick={openForm}>{popup.title}</td>
                <td  onClick={openForm}>{popup.startDate}</td>
                <td  onClick={openForm}>{popup.endDate}</td>
                <td  onClick={openForm}>{popup.status}</td>
                <td><button value={popup.id} onClick={onDeletePop}>삭제</button></td>
            </tr>

            {isOpen &&(<PopupForm popup={popup} setIsOpen={setIsOpen} />)}
        </>
    )
}
export default PopupItem;