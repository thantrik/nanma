import { Register } from "../../app";
import json from"./dashboard.reducer";
import route from"./dashboard.routes";

const config = {
  name: "dashboard",
  route,
  reducer: json,
};

Register(config);
