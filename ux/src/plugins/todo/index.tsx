import { Register } from "../../app";
import code from "./code.reducer";
import route from "./code.routes";

const config = {
  name: "code",
  route,
  reducer: code,
};

Register(config);
