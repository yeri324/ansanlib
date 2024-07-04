import React from "react";

function FaqItem ({ faq, onDetail, checkedList, checkHandler, handlePreview}) {
    return (
        <div>
            <tr>
                <td><input type='checkbox' id={faq.id} checkedList={checkedList.includes(faq.id)} onChange={(e) => checkHandler(e, faq.id)} /></td>
                <td>{faq.id}</td>
                <td onClick={() => onDetail(faq)}>{faq.title}</td>
                <td>{faq.updateTime.split('T')[0]}</td>
                {/*  */}
                {!faq.faqImgs[0]?null:<td><img src={faq.faqImgs[0].imgUrl} /></td>}
                {/* {console.log(faq.faqImgs[0].imgName)} */}
            </tr>
            
        </div>
    );
}
export default FaqItem;