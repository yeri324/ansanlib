

const UserLoanItem = ({ loan,onClickToReturn }) => {

    return (
        <tr key={loan.id}>
            <td>id : {loan.id}</td>
            <td> || bookId : {loan.book.id}</td>
            <td> || {loan.loanStart.split('T')[0]}</td>
            <td> || {loan.loanEnd.split('T')[0]}</td>
            <button type="button" class="btn btn-outline-dark" value={loan.id} onClick={onClickToReturn}>반납</button>
        </tr>
    );
};


export default UserLoanItem;