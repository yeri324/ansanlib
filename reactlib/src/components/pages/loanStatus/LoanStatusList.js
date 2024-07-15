import React, {useEffect, useState} from "react";
import useAuth,{ LOGIN_STATUS } from '../../hooks/useAuth';
import Auth from '../../helpers/Auth';
import RedirectLogin from '../../helpers/RedirectLogin';
import useRealName from "../../hooks/useRealName";

const LoanStatusList = ()=>{
    const name  = useRealName();

    const {axios} = useAuth();

    const [loanStatuses, setLoanStatuses] = useState([]);
    const [isErrored, setErrored] =useState(false);

    const fetchLoanStatus = async ()=>{
        try{
            const response = await axios.get(`/api/loanstatus/get`);
            setLoanStatuses(response.data);
            setErrored(false);
        } catch(error) {
            setErrored(true);
            console.error('대출상태를 가져오는 중에 오류가 발생했습니다.', error);
        }
    };

    useEffect(()=>{ fetchLoanStatus(); }, []);

    return (
        <div>
            <h2> {name}의 대출 상태 </h2>
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

export default function() {
    return (
      <>
        <RedirectLogin />
        <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
          <LoanStatusList />
        </Auth>
      </>
    );
  };