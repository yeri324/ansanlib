import React from "react";

const FaqItem = ({faq, handleDetail, checkedList, checkHandler, }) => {
    return (
        <tr>
            <td><input type='checkbox' id={faq.id} checkedList={checkedList.includes(faq.id)} onChange={(e) => checkHandler(e, faq.id)} /></td>
            <td>{faq.id}</td>
            <td onClick={() => handleDetail( faq )}>{faq.title}</td>
            <td>{faq.regTime}</td>
            <td>{faq.updateTime}</td>
        </tr>
    );
}
export default FaqItem;