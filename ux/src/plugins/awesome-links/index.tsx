import { Register } from "../../app";
import json from"./awesome-links.reducer";
import route from"./awesome-links.routes";

const config = {
  name: "awesome-links",
  route,
  reducer: json,
};

Register(config);
