import React from 'react';

function BoardItem({ item, onDetail, checkedList, checkHandler, }) {

    return (
            <tr>
                <td><input type='checkbox' id={item.id} checked={checkedList.includes(item.id)} onChange={(e) => checkHandler(e, item.id)} /></td>
                <td>{item.id}</td>
                <td onClick={() => onDetail(item)}>{item.title}</td>
                <td>{item.createdBy}</td>
                <td>{item.updateTime.split('T')[0]}</td>
                <td>{item.count}</td>
            </tr>
    );
}

export default BoardItem;