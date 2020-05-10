import { Register } from "../../app";
import json from"./table-gen.reducer";
import route from"./table-gen.routes";

const config = {
  name: "table-gen",
  route,
  reducer: json,
};

Register(config);
