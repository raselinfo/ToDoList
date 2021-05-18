import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
const Item = ({ item, id, deleteItem, handleLinethrough,line,editItem }) => {
   
    return (
        <li>
            <div>
                <button onClick={()=>handleLinethrough(id)} className="checkbox" style={{background:line ? "tomato" : "#fff"}}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <span>{item}</span>
            </div>
            <div className="delUp">
                <FontAwesomeIcon onClick={()=>editItem(id)} className="edit" icon={faEdit} />
                <FontAwesomeIcon onClick={() => deleteItem(id)} className="delete" icon={faTrashAlt} />
            </div>
        </li>
    );
};

export default Item;