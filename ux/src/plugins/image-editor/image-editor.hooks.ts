import { context, AppContext } from "../../app";
import { setImageEditorView } from "./image-editor.actions";
import config from "./image-editor.config";

const imageEditorView = (imageSrc: string, parse = false) => {
  context.setDOMOwner(config);
  setImageEditorView({ imageSrc });
};

const hook = (context: AppContext) => {
  if (context.isHTML()) return;
  if (/\.(jpg|jpeg|webp|png|svg|bmp)$/i.test(window.location.href)) {
    imageEditorView(window.location.href);
  }
};

export default hook;
