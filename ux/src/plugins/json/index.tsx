import { Register } from "../../app";
import json from "./json.reducer";
import route from "./json.routes";

const config = {
  name: "JSON",
  route,
  reducer: json,
};

Register(config);
