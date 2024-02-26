import style from "./addItems.module.scss";
import React, { useState } from "react";
import { handleAddItem } from "../handleItems";

const Items = ({ data, setData, listRef, isNewItemAdded }) => {
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
            placeholder="請輸入代辦事項"
            aria-label="Recipient's username"
            ariaDescribedby="button-addon2"
          />
          <button
            onClick={() => {
              setItems("");
              handleAddItem(items, data, setData, isNewItemAdded);
              listRef.current.scrollTop = listRef.current.scrollHeight;
            }}
            className={`${style.button_bg} btn text-light`}
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
