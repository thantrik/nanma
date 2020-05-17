import { Register } from "../../app";
import json from"./photo-edit.reducer";
import route from"./photo-edit.routes";

const config = {
  name: "photo-edit",
  route,
  reducer: json,
};

Register(config);
