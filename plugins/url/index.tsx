import { Register } from "../../app";
import json from"./url.reducer";
import route from"./url.routes";

const config = {
  name: "url",
  route,
  reducer: json,
};

Register(config);
