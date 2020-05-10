import { Register } from "../../app";
import json from"./web-server.reducer";
import route from"./web-server.routes";

const config = {
  name: "web-server",
  route,
  reducer: json,
};

Register(config);
