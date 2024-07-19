import './AdminPage.css'
import { GlobalStyles } from './GlobalStyles';
const UserLoanItem = ({ loan,onClickToReturn }) => {

    return (
        <>
           <GlobalStyles width="100vw" />
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


export default UserLoanItem;