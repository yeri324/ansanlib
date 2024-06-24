const AdminUserItem= (userId,name,loginid,penalty,lateFee)=>{
    return (
        <div>
            <tr>
                <td>{userId}</td>
                <td>{name}</td>
                <td>{loginid}</td>
                <td>{penalty}</td>
                <td>{lateFee}</td>
            </tr>
        </div>
    );
    }
    export default AdminUserItem;