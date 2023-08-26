import React, { useState, useEffect } from 'react'
import './style.css'

const getLocalData = () =>{
  const lists = localStorage.getItem("mytodolist");

  if(lists){
    return JSON.parse(lists);
  }else{
    return [];
  }
}
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const handleData = (e) => {
    setInputData(e.target.value);
  }
  const addItem = () => {
    if (!inputData) {
      alert('please input the data');
    } else {
      const newData={
        id:new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, newData]);
      setInputData("");
    }
    console.log(items);
  };

  const deleteItem = (index) => {
    const updateItems = items.filter((curElement)=>{
      return curElement.id !== index;
    });
    setItems(updateItems);
  };

  const removeAll = () =>{
    setItems([]);

  }

  useEffect(() => {
   localStorage.setItem("mytodolist", JSON.stringify(items));
  },[items]);
  return (
    <div className='main-div'>
      <div className='child-div'>
        <div className='picture'>
          <figure>
            <img src="./image.png" alt=""></img>
            <figcaption><b>Add items in the List.</b></figcaption>
          </figure>
        </div>
        <div className='item-list'>
          <input type='text' placeholder='✍ Add Items' className='form-control' value={inputData} onChange={handleData} />
          <i className="fa fa-plus add-btn" onClick={addItem}></i>
        </div>

        <div className='showItems'>
          {items.map((curElement) => {
            return (
              <div className='eachItem' key={curElement.id}>
                <h3>{curElement.name}</h3>
                <div className='todo-btn'>
                  <i className="far fa-edit add-btn"></i>
                  <i className="far fa-trash-alt add-btn" onClick={ ()=>deleteItem(curElement.id)}></i>
                </div>
              </div>
            );
          })}

        </div>
        <div className='items'>
          <button className='btn effect04' data-sm-link-text="Remove all" onClick={removeAll} ><span>Check list</span></button>
        </div>
      </div>
    </div>
  )
}
export default Todo