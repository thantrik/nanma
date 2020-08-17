import hook from "./md-editor.hooks";
import icon from "./md-editor.icon";
import mdEditor from "./md-editor.reducer";
import route from "./md-editor.routes";

const config = {
  name: "md-editor",
  route,
  reducer: mdEditor,
  hook: hook,
  icon,
};

export default config;
