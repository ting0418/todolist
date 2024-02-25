import {addItem,deleteItem} from '../actions/action'
// 初始狀態
const init={
    data:[]
}
const todoReducer = (state = init, action) => {
    switch (action.type) {
      case addItem:
        return {
          ...state,
          data: [...state.data, { id: state.data.length + 1, text: action.value, done: false }],
        };
      case deleteItem:
        return {
          ...state,
          data: state.data.filter((item) => item.id !== action.value),
        };
      default:
        return state;
    }
  };
  
  export default todoReducer;