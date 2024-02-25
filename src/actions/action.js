export const addItem=(value)=>{
    return{
        type:'ADD',
        value:value
    }
}
export const deleteItem=(value)=>{
    return{
        type:'DELETE',
        value:value
    }
}