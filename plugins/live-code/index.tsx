import { Register } from "../../app";
import json from"./live-code.reducer";
import route from"./live-code.routes";

const config = {
  name: "live-code",
  route,
  reducer: json,
};

Register(config);
