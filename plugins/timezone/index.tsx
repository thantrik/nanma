import { Register } from "../../app";
import json from"./timezone.reducer";
import route from"./timezone.routes";

const config = {
  name: "timezone",
  route,
  reducer: json,
};

Register(config);
