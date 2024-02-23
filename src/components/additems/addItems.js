// Items.js
import React, { useState } from "react";
import { handleAddItem } from '../handleItems';

const Items = ({ data, setData ,listRef }) => {
  const [items, setItems] = useState("");
 
  
  return (
    <>
      <div>
        <p className="ps-5">Add to list</p>
        <div className="input-group mb-3 px-5">
          <input
            type="text"
            value={items}
            onChange={(e) => {
              setItems(e.target.value);
            }}
            className="form-control"
            placeholder='請輸入代辦事項'
            aria-label="Recipient's username"
            ariaDescribedby="button-addon2"
          />
          <button
            onClick={() => {
               setItems("")
              handleAddItem(items, data, setData);
              listRef.current.scrollTop = listRef.current.scrollHeight;
              console.log("listRef in onClick:", listRef.current); // 檢查 listRef 的值
            }}
            className="btn btn-primary"
            type="button"
            id="button-addon2"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default Items;
