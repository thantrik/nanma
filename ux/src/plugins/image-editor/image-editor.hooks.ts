import { AppContext, setDOMOwner } from "../../app";
import {
  setImageEditorView,
  setImageEditorViewRoute,
} from "./image-editor.actions";

import config from "./image-editor.config";

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

const base64toBlob = (
  b64Data: string,
  contentType: string = "image/jpeg",
  sliceSize = 512
) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

//@ts-ignore
window.setScreenshotUrl = function (dataUrl: string) {
  setImageEditorViewRoute();
  const data = dataUrl.slice(dataUrl.indexOf(",") + 1);
  //@ts-ignore
  const url = URL.createObjectURL(base64toBlob(data));
  console.log("Created url", url);
  setImageEditorView({ imageSrc: url });
};
