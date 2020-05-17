import { Register } from "../../app";
import json from"./my-web.reducer";
import route from"./my-web.routes";

const config = {
  name: "my-web",
  route,
  reducer: json,
};

Register(config);
