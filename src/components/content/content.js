// Content.js
import React, { useState,useEffect ,useRef} from "react";
import Items from "../additems/addItems"; 
import { ProgressBar } from "react-bootstrap";
const Content = () => {
  const [data, setData] = useState([{
    id:1,text:"掃地",done:true
  },{
    id:2,text:"拖地",done:false
  },{
    id:3,text:"掃地",done:true
  },{
    id:4,text:"掃地",done:true
  }]);
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
      const total = parseFloat(((doneCount / totalCount) * 100).toFixed(0));


 
      return total;
    };
    const listRef = useRef(null);
    useEffect(() => {
      // 在 data 狀態改變後，將滾動條滾至最下方
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    }, [data]);
  return (
    <>
      <div className="ps-5" ref={listRef} style={{ maxHeight: '200px', overflowY: 'auto' }}>
      <ProgressBar className="mb-3 w-25" now={calculateProgress()} label={`${calculateProgress()}%`} />
        {data.map((item) => (
          <div key={item.id} className="d-flex align-items-center">
            <div className="input-group mb-3 me-5">
  <div className="input-group-text ">
    <input className="form-check-input mt-0" onClick={()=>{
                handleSwitch(item.id)
            }}type="checkbox" checked={item.done}aria-label="Checkbox htmlFor following text input"/>
  </div>
  {/* 利用是否有勾選來判斷是否加上刪除線 */}
  <input type="text" value={item.text}className={item.done? "text-decoration-line-through form-control":"form-control"}  aria-label="Text input with checkbox" readOnly />
  <button  className="btn bg-white" onClick={()=>{
    deleteList(item.id)
  }}>x</button>
</div>
          </div>
        ))}
      </div>
      <hr style={{ marginInline: "50px" }} />
      <div className=" form-check form-switch d-flex justify-content-end">
  <input  onClick={toggleSort}  className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
  <label className="form-check-label" for="flexSwitchCheckDefault">Move done things to end?</label>
</div>
      <Items data={data} setData={setData} listRef={listRef}/>
    </>
  );
};

export default Content;
