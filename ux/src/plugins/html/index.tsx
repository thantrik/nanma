import { Register } from "../../app";
import json from"./html.reducer";
import route from"./html.routes";

const config = {
  name: "html",
  route,
  reducer: json,
};

Register(config);
