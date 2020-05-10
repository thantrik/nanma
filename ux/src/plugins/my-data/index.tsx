import { Register } from "../../app";
import json from"./my-data.reducer";
import route from"./my-data.routes";

const config = {
  name: "my-data",
  route,
  reducer: json,
};

Register(config);
