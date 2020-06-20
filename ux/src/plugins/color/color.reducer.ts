import { Reducer } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { IState } from "./color.types";

const initialState: IState = {
  hexCode: "#FFFFFF",
};

const color: Reducer = createReducer(initialState, {});

export default color;
