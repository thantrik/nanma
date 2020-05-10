import { Register } from "../../app";
import json from"./unicode.reducer";
import route from"./unicode.routes";

const config = {
  name: "unicode",
  route,
  reducer: json,
};

Register(config);
