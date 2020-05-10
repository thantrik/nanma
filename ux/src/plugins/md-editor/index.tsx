import { Register } from "../../app";
import json from"./md-editor.reducer";
import route from"./md-editor.routes";

const config = {
  name: "md-editor",
  route,
  reducer: json,
};

Register(config);
