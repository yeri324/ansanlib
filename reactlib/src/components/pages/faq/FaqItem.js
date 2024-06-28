import React from "react";

const FaqItem = ({faq, handleDetail, checkedList, checkHandler, }) => {
    return (
        <tr>
            <td><input type='checkbox' id={faq.id} checkedList={checkedList.includes(faq.id)} onChange={(e) => checkHandler(e, faq.id)} /></td>
            <td>{faq.id}</td>
            <td onClick={() => handleDetail( faq )}>{faq.title}</td>
            <td>{faq.updateTime.split('T')[0]}</td>
            {faq.images &&
              faq.images.map((image, index) => (
                <div key={index}>
                  <img 
                    src={`http://localhost:3000/${image}`}
                  />
                </div>
              ))}
        </tr>
    );
}
export default FaqItem;