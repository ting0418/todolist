export const handleAddItem = (newItemText, data, setData) => {
    // 添加新todo
    const newItem = {
      id: data.length + 1, 
      text: newItemText,
      done: false,
    };
  
    // 更新 data 狀態，將新todo添加到陣列中
    setData([...data, newItem]);
  };
  