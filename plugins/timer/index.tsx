import { Register } from "../../app";
import json from"./timer.reducer";
import route from"./timer.routes";

const config = {
  name: "timer",
  route,
  reducer: json,
};

Register(config);
