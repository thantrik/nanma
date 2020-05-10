import { Register } from "../../app";
import json from"./svg-edit.reducer";
import route from"./svg-edit.routes";

const config = {
  name: "svg-edit",
  route,
  reducer: json,
};

Register(config);
