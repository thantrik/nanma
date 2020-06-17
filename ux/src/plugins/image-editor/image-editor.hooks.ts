import { context, AppContext } from "../../app";
import { setImageEditorView } from "./image-editor.actions";
import config from "./image-editor.config";

const imageEditorView = (imageSrc: string, parse = false) => {
  context.setDOMOwner(config);

  setImageEditorView({
    imageSrc,
    imageName: imageSrc.split("?")[0].split("/").pop(),
  });
};

const hook = (context: AppContext) => {
  if (context.isHTML()) return;
  if (
    /\.(jpg|jpeg|webp|png|bmp)$/i.test(window.location.href) ||
    /(jpg|jpeg|webp|png|bmp)$/i.test(document.contentType)
  ) {
    imageEditorView(window.location.href);
  }
};

export default hook;
