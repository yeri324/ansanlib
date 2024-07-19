import React from 'react';
import useAuth from '../../../hooks/useAuth';

function BoardItem({ item, onDetail, checkedList, checkHandler, }) {

    const { roles } = useAuth();

    return (
            <tr>
                {console.log(roles)}
                <td><input type='checkbox' id={item.id} checked={checkedList.includes(item.id)} onChange={(e) => checkHandler(e, item.id)} /></td>
                <td>{item.id}</td>
                <td onClick={() => onDetail(item)}>{item.title}</td>
                <td>{item.createdBy}</td>
                <td>{item.updateTime.split('T')[0]}</td>
              
            </tr>
    );
}

export default BoardItem;