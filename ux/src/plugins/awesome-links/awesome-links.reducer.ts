import { Reducer } from "redux";
//import { setAwesomeLinkView } from "./awesome-links.actions";
import { createReducer } from "@reduxjs/toolkit";
import { AwesomeLinksType } from "./awesome-links.types";

interface IState {
  type: AwesomeLinksType;
}

const initialState = {
  type: "links",
};

const AwesomeLinks: Reducer = createReducer(initialState, {
  //[setJSONView as any]: (state, action) => ({ type: action.payload }),
});

export default AwesomeLinks;
