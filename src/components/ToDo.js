import React, { useEffect, useState } from 'react';
import todo from "../image/todo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import Item from './Item';
const ToDo = () => {
    // get data from localStorage
    const getDate = () => {
        const list = localStorage.getItem("list")
        if (list) {
            return JSON.parse(list)
        } else {
            return []
        }
    }

    const [inputValue, setInputValue] = useState({
        toDo: ""
    })
    const [message, setMessage] = useState({
        error: "",
        success: ""
    })
    const [items, setItems] = useState(getDate())
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState(null)

    const handleOnchang = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const newInputValue = { ...inputValue };
        newInputValue[name] = value;
        setInputValue(newInputValue)
    }
    const handleOnSumit = (e) => {
        e.preventDefault()
        if (inputValue === "") {
            const newMessage = { ...message }
            newMessage.error = " ⚠️ Please write you ToDo"
            newMessage.success = ""
            setMessage(newMessage)
        } else {
            const newInputValue = { ...inputValue, id: new Date().getTime().toString(), line: false }
            const newItems = [...items, newInputValue]
            setItems(newItems)
            setInputValue((preValue) => {
                return { ...preValue, toDo: "" }
            })
        }

    }
    // Delete Item
    const deleteItem = (id) => {
        const newItems = items.filter(item => {
            return item.id !== id
        })
        setItems(newItems)
        
    }
    // Update  Item
    const updateItem = (e) => {
        e.preventDefault();
        const newItems = items.map(item => {
            if (item.id === editId) {
                return { ...item, toDo: inputValue.toDo }
            }
            return item;
        }) 
        setItems(newItems)
        setEdit(false)
        setInputValue(preValue=>{
            return {...preValue,toDo:""}
        })
    }
    // handleLineThrough
    const handleLinethrough = (id) => {
        const newItems = items.map(item => {
            if (item.id === id) {
                if (item.line === false) {
                    return { ...item, line: true }
                } else {
                    return { ...item, line: false }
                }

            }
            return item
        })
        setItems(newItems)
    }
    // Edit Item
    const editItem = (id) => {
        const newItem = items.find(item => {
            return item.id === id
        })
        setInputValue(preValue => {
            return { ...preValue, toDo: newItem.toDo }
        })
        setEdit(true)
        setEditId(id)
    }
    // Delete All Item
    const deleteAllItem=()=>{
        setItems([])
    }
    // add items to locatStroge
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(items))
    }, [items])

    return (
        <div>
            <div className="todo__img" >
                <img src={todo} alt="todo" />
            </div>
            <div className="todo__wrapper">
                <br />
                <form onSubmit={edit ? updateItem : handleOnSumit}>
                    <div className="input__group">
                        <input value={inputValue.toDo} onChange={handleOnchang} type="text" name="toDo" placeholder=" ✍️ Write ToDo....." />
                        {
                            edit ? <button className="add__item">
                                <FontAwesomeIcon icon={faEdit} />
                            </button> : <button className="add__item">
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        }

                    </div>
                </form>
                <div className="items">
                    <ul>
                        {
                            items.map(item => {
                                return <Item key={item.id} item={item.toDo} id={item.id} line={item.line} deleteItem={deleteItem} handleLinethrough={handleLinethrough} editItem={editItem}></Item>
                            })
                        }
                    </ul>
                </div>
                <div className="delete__all">
                    <button onClick={deleteAllItem} className="btn">Delete All</button>
                </div>
            </div>
        </div>
    );
};

export default ToDo;