import { Register } from "../../app";
import json from "./clock.reducer";
import route from "./clock.routes";

const config = {
  name: "clock",
  route,
  reducer: json,
};

Register(config);
