import { Register } from "../../app";
import json from"./github.reducer";
import route from"./github.routes";

const config = {
  name: "github",
  route,
  reducer: json,
};

Register(config);
