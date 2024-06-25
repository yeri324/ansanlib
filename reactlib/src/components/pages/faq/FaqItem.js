const FaqItem = (id,title,regTime,updateTime) => {
    return (
        <tr>
            <td>{id}</td>
            <td >{title}</td>
            <td>{regTime}</td>
            <td>{updateTime}</td>
        </tr>
    );
}
export default FaqItem;