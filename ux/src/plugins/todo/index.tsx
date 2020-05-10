import { Register } from "../../app";
import json from"./todo.reducer";
import route from"./todo.routes";

const config = {
  name: "todo",
  route,
  reducer: json,
};

Register(config);
