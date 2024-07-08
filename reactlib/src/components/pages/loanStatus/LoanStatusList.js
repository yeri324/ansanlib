import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoanStatusList = ()=>{
    const navigate = useNavigate();
    
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState("");
    const [loanStatuses, setLoanStatuses] = useState([]);
    const [isErrored, setErrored] =useState(false);

    useEffect(()=>{
        const memberData = JSON.parse(sessionStorage.getItem("member") ?? "null");
        if(memberData?.userId){
            setUserId(memberData?.userId);
            setUserName(memberData?.name);
        } else {
            setErrored(true);
            alert("로그인이 되어있지 않습니다.");
            navigate("/login");
        }
    },[]);

        const LoanStatuses = async()=>{
            if(userId) {
                try{
                    const response = await axios.get(`/api/loanstatus/get/by-user/${userId}`);
                    setLoanStatuses(response.data);
                } catch(error){
                    setErrored(true);
                    console.error('대출상태를 가져오는 중에 오류가 발생했습니다.',error);
                }
            }
            
        };

        useEffect(() => { LoanStatuses();}, [userId]);

    return (
        <div>
            <h2> {userName}의 대출 상태 </h2>
            {loanStatuses.length > 0 ?(
                 <ul>
                 {loanStatuses.map(status=>(
                     <li key={status.id}>
                        책: {status.book.title}, 대출 시작 일자 :{new Date (status.loanStart).toLocaleDateString()}, 반납예정일 :{new Date(status.loanEnd).toLocaleDateString()}
                     </li>
                 ))}
             </ul>
            ) : (
                <p>대출한 도서가 없습니다.</p> 
            )}
           {isErrored && <p>오류가 발생했습니다. 나중에 다시 시도해 주세요.</p>}
        </div>
    );
}

export default LoanStatusList;