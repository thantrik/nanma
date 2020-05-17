import code from "./code.reducer";
import route from "./code.routes";
import hook from "./code.hooks";

const config = {
  name: "code",
  route,
  reducer: code,
  hook,
};

export default config;
