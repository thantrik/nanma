import { Register } from "../../app";
import json from "./csv.reducer";
import route from "./csv.routes";

const config = {
  name: "csv",
  route,
  reducer: json,
};

Register(config);
