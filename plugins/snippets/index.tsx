import { Register } from "../../app";
import json from"./snippets.reducer";
import route from"./snippets.routes";

const config = {
  name: "snippets",
  route,
  reducer: json,
};

Register(config);
