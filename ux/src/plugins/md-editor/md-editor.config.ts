import mdEditor from "./md-editor.reducer";
import route from "./md-editor.routes";
import hook from "./md-editor.hooks";

const config = {
  name: "md-editor",
  route,
  reducer: mdEditor,
  hook: hook,
};

export default config;
