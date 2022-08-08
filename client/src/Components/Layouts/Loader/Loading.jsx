import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="w-full m-auto flex justify-center items-center mt-56 mb-56">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
