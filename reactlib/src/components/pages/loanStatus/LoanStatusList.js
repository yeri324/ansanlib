import React, {useEffect, useState} from "react";
import useAuth,{ LOGIN_STATUS } from '../../hooks/useAuth';
import Auth from '../../helpers/Auth';
import RedirectLogin from '../../helpers/RedirectLogin';
import useRealName from "../../hooks/useRealName";
import Header from "../../fragments/header/header";
import Footer from "../../fragments/footer/footer";
import Side from "../myPage/Side";
import './LoanStatusList.css';

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
            //항목을 찾을수 없음
            if (error.response.status === 404) {
                setErrored(false);
                setLoanStatuses([]);
            } else {
                setErrored(true);
                console.error('대출상태를 가져오는 중에 오류가 발생했습니다.', error);
            }
        }
    };

    useEffect(()=>{ fetchLoanStatus(); }, []);

    return (
      <div className="mypage-container">
      <div className='mypage-header'>
        <h2 className='mypage-header-name'>{name}의 대출 상태</h2>
      </div>

        <div className="loan-status-container">
          {loanStatuses.length > 0 ? (
            
              <table>
                <thead>
                <th>책</th>
                <th>대출 시작일</th>
                <th>반납 예정일</th>
                </thead>
              {loanStatuses.map(status => (
                <tr key={status.id}>
                  <td>{status.book.title}</td>
                  <td>{new Date(status.loanStart).toLocaleDateString()}</td>
                  <td> {new Date(status.loanEnd).toLocaleDateString()}</td>
                </tr>
              ))}
            </table>
          ) : (
            <p>대출한 도서가 없습니다.</p>
          )}
          {isErrored && <p>오류가 발생했습니다. 나중에 다시 시도해 주세요.</p>}
        </div>
        </div>
      );      
}

export default function() {
    return (
      <>
        <RedirectLogin />
        <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
        <Header />
        <div className="MyPage-body">
          <Side />
          <LoanStatusList />
        </div>
        <Footer />
        </Auth>
      </>
    );
  };