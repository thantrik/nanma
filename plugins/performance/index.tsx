import { Register } from "../../app";
import json from"./performance.reducer";
import route from"./performance.routes";

const config = {
  name: "performance",
  route,
  reducer: json,
};

Register(config);
