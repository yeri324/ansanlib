import './AdminPage.css'
import useAuth, { LOGIN_STATUS, ROLES } from '../../hooks/useAuth';
import Auth from '../../helpers/Auth';
import RedirectLogin from '../../helpers/RedirectLogin';

const UserLoanItem = ({ loan,onClickToReturn }) => {
    const { axios } = useAuth();
    return (
        
        <>

        <tr key={loan.id}>
            <td>{loan.id}</td>
            <td>{loan.book.title}</td>
            <td>{loan.loanStart.split('T')[0]}</td>
            <td>{loan.loanEnd.split('T')[0]}</td>
           <td> <button type="button" id="adminbtn" class="btn btn-outline-dark"  value={loan.id} onClick={onClickToReturn}>반납</button></td>
        </tr>
        </>
    );
};


export default function () {
    return (
      <>
        <RedirectLogin />
        <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
          <UserLoanItem  />
        </Auth>
      </>
    );
  }