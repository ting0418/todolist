import style from "./header.module.scss";
const Header = () => {
  return (
    <>
      <h1 className={`${style.text} text-start pt-3 ps-5`}>Todo List</h1>
      <p className={`${style.text}  ps-5`}>Add things to do</p>
      <hr style={{ marginInline: "50px" }} />
    </>
  );
};

export default Header;
