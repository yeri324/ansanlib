import React from "react";

function FaqItem ({ faq, handleDetail, checkedList, checkHandler, handlePreview}) {
    return (
        <div>
            <tr>
                <td><input type='checkbox' id={faq.id} checkedList={checkedList.includes(faq.id)} onChange={(e) => checkHandler(e, faq.id)} /></td>
                <td>{faq.id}</td>
                <td onClick={() => handleDetail(faq)}>{faq.title}</td>
                <td>{faq.updateTime.split('T')[0]}</td>
                {/* <td><img src={imgsrc} /></td> */}
                {/* {console.log(faq.faqImgs[0].imgUrl)} */}
            </tr>
            
        </div>
    );
}
export default FaqItem;