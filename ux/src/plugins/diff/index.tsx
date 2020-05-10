import { Register } from "../../app";
import json from"./diff.reducer";
import route from"./diff.routes";

const config = {
  name: "diff",
  route,
  reducer: json,
};

Register(config);
