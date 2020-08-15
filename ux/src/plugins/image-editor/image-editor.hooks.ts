import { AppContext, setDOMOwner } from "../../app";

import config from "./image-editor.config";
import { setImageEditorView } from "./image-editor.actions";

const imageEditorView = (imageSrc: string, parse = false) => {
  setDOMOwner(config, () => {
    setImageEditorView({
      imageSrc,
      imageName: imageSrc.split("?")[0].split("/").pop(),
    });
  });
  //@ts-ignore
  import("../../app/app.styles.css");
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
