import { Register } from "../../app";
import json from"./rich-text.reducer";
import route from"./rich-text.routes";

const config = {
  name: "rich-text",
  route,
  reducer: json,
};

Register(config);
