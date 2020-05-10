import { combineReducers, Reducer } from "redux";

import { setJsonViewData } from"./todo.actions";
import { createReducer } from "@reduxjs/toolkit";
import { TodoType } from"./todo.types";

interface IState {
  data: TodoType;
}

const initialState = {
  data: { tt: 10 },
};

const json: Reducer = createReducer(initialState, {
  [setJsonViewData as any]: (state, action) => ({ data: action.payload }),
});

export default json;
