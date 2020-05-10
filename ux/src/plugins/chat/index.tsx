import { Register } from "../../app";
import json from "./chat.reducer";
import route from "./chat.routes";

const config = {
  name: "chat",
  route,
  reducer: json,
};

Register(config);
