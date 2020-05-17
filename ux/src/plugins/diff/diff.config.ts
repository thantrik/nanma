import { Register } from "../../app";
import diff from "./diff.reducer";
import route from "./diff.routes";

const config = {
  name: "diff",
  route,
  reducer: diff,
};

export default config;
