import { Register } from "../../app";
import json from"./prettier.reducer";
import route from"./prettier.routes";

const config = {
  name: "prettier",
  route,
  reducer: json,
};

Register(config);
