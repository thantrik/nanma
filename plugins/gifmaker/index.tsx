import { Register } from "../../app";
import json from"./gifmaker.reducer";
import route from"./gifmaker.routes";

const config = {
  name: "gifmaker",
  route,
  reducer: json,
};

Register(config);
