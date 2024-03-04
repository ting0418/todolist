import style from "./content.module.scss";
import React, { useState, useEffect, useRef } from "react";
import Items from "../addItems/addItems";
import { ProgressBar } from "react-bootstrap";
const Content = () => {
  const [data, setData] = useState([
    {
      id: 1,
      text: "Learn React",
      done: true,
    },
    {
      id: 2,
      text: "Learn Golang",
      done: false,
    },
    {
      id: 3,
      text: "Learn Docker",
      done: true,
    },
    {
      id: 4,
      text: "Learn something else",
      done: false,
    },
  ]);
  // 開關move down的state
  const [sortDoneToEnd, setSortDoneToEnd] = useState(false);

  const handleSwitch = (itemId) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      )
    );
  };
  const deleteList = (itemId) => {
    setData((prevData) => prevData.filter((item) => item.id !== itemId));
  };
  // 決定開關Move done things to end的函式
  const toggleSort = () => {
    setSortDoneToEnd((prevSort) => !prevSort);
  };
  useEffect(() => {
    // 在 sortDoneToEnd 狀態改變重新排序
    setData((prevData) =>
      [...prevData].sort((a, b) => {
        if (sortDoneToEnd) {
          return a.done - b.done;
        } else {
          return a.id - b.id;
        }
      })
    );
  }, [sortDoneToEnd]);

  // 計算進度條百分比
  const calculateProgress = () => {
    const doneCount = data.filter((item) => item.done).length;
    const totalCount = data.length;

    if (totalCount === 0) {
      return 0;
    }
    // const total = parseFloat(((doneCount / totalCount) * 100).toFixed(0));
    const total = ((doneCount / totalCount) * 100).toFixed(0);
    console.log(total);
    return total;
  };
  const listRef = useRef(null);
  const isNewItemAdded = useRef(false); // 使用 useRef 來標記是否新增了一個事件

  useEffect(() => {
    // 在 data 狀態改變後，只有在新增事件時才將滾動條滾至最下方
    if (listRef.current && isNewItemAdded.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
      isNewItemAdded.current = false; // 重置標記
    }
  }, [data]);
  return (
    <>
      <div
        className="ps-5"
        ref={listRef}
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between">
          <ProgressBar
            className="mb-3 w-25"
            // 現在進度
            now={calculateProgress()}
            label={`${calculateProgress()}%`}
          />
          <div className="d-flex text-end ">
            <p className={`${style.text} me-2 text-bold`}>
              已完成{data.filter((item) => item.done).length}件代辦事項
            </p>
            <p className={`${style.text} me-5`}>
              未完成{data.filter((item) => item.done === false).length}
              件代辦事項
            </p>
          </div>
        </div>

        {data.map((item) => (
          <div key={item.id} className="d-flex align-items-center">
            <div className="input-group mb-3 me-5">
              <div className="input-group-text ">
                <input
                  className="form-check-input mt-0"
                  onClick={() => {
                    handleSwitch(item.id);
                  }}
                  type="checkbox"
                  checked={item.done}
                  aria-label="Checkbox htmlFor following text input"
                />
              </div>
              {/* 利用是否有勾選來判斷是否加上刪除線 */}
              <input
                type="text"
                value={item.text}
                className={
                  item.done
                    ? `${style.text} text-decoration-line-through form-control`
                    : `${style.text} form-control`
                }
                aria-label="Text input with checkbox"
                readOnly
              />

              <button
                className={`${style.text} btn bg-white`}
                onClick={() => {
                  deleteList(item.id);
                }}
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
      <hr style={{ marginInline: "50px" }} />
      <div className=" form-check form-switch d-flex justify-content-end">
        <input
          onClick={toggleSort}
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
        />
        <label
          className={`${style.moveDown} form-check-label`}
          for="flexSwitchCheckDefault"
        >
          Move done things to end?
        </label>
      </div>
      <Items
        data={data}
        setData={setData}
        isNewItemAdded={isNewItemAdded}
        listRef={listRef}
      />
    </>
  );
};

export default Content;
