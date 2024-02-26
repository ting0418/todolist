import Swal from "sweetalert2";

export const handleAddItem = (newItemText, data, setData, isNewItemAdded) => {
  // 添加新todo
  const newItem = {
    id: data.length + 1,
    text: newItemText,
    done: false,
  };
  isNewItemAdded.current = true;
  // 欄位空白就顯示
  if (newItem.text === "") {
    Swal.fire({
      icon: "error",
      title: "錯誤",
      text: "欄位不可空白!",
    });
  } else {
    // 更新 data 狀態，將新todo添加到陣列中
    Swal.fire({
      icon: "success",
      title: "成功",
      text: "您已輸入成功!",
    }).then(setData([...data, newItem]));
  }
};
