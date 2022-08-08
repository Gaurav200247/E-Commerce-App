import React from "react";
import { useDispatch } from "react-redux";
import "./SidebarToggleBtn.css";

const SidebarToggleBtn = () => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="sidebar-toggle-button"
        onClick={() => dispatch({ type: "OpenSideBar" })}
      >
        <div className="left"></div>
        Admin Powers
        <div className="right"></div>
      </button>
    </>
  );
};

export default SidebarToggleBtn;
