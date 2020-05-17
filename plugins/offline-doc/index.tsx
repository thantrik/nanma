import { Register } from "../../app";
import json from"./offline-doc.reducer";
import route from"./offline-doc.routes";

const config = {
  name: "offline-doc",
  route,
  reducer: json,
};

Register(config);
