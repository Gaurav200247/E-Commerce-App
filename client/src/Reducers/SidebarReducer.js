import { createReducer } from "@reduxjs/toolkit";

export const sideBarReducer = createReducer(
  {},
  {
    OpenSideBar: (state) => {
      state.isSideBar = true;
    },
    CloseSideBar: (state) => {
      state.isSideBar = false;
    },
  }
);
