import { Register } from "../../app";
import json from"./icon-maker.reducer";
import route from"./icon-maker.routes";

const config = {
  name: "icon-maker",
  route,
  reducer: json,
};

Register(config);
