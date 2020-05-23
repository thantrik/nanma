import { Reducer } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { ColorType } from "./color.types";

interface IState {
  hexCode: ColorType;
}

const initialState = {
  hexCode: "#FFFFFF",
};

const color: Reducer = createReducer(initialState, {});

export default color;
