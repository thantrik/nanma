import { Register } from "../../app";
import json from"./read-later.reducer";
import route from"./read-later.routes";

const config = {
  name: "read-later",
  route,
  reducer: json,
};

Register(config);
