import imageEditor from"./image-editor.reducer";
import route from"./image-editor.routes";
import hook from"./image-editor.hooks";
import { IPluginConfig } from "../../app/app.types";
import icon from"./image-editor.icon";
import { IMAGE_EDITOR_PLUGIN_NAME } from"./image-editor.constants";

const config: IPluginConfig = {
  name: IMAGE_EDITOR_PLUGIN_NAME,
  route,
  reducer: imageEditor,
  hook: hook,
  icon,
};

export default config;
