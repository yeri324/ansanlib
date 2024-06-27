

const UserLoanItem = ({ loan,onClickToReturn }) => {

    return (
        <tr key={loan.id}>
            <td>{loan.id}</td>
            <td>{loan.book.id}</td>
            <td>{loan.loanStart}</td>
            <td>{loan.loanEnd}</td>
            <button value={loan.id} onClick={onClickToReturn}>반납</button>
        </tr>
    );
};


export default UserLoanItem;