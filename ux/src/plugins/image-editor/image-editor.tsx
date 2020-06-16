import React from "react";
import {
  setImageEditorView,
  setImageEditorViewRoute,
} from "./image-editor.actions";
import NanmaImageEditor from "../../components/image-editor";

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

class ImageEditorEditorApp extends React.Component<any, any> {
  // constructor(props: any) {
  //   super(props);
  // }

  render() {
    console.log("this.props.imageSrc", this.props.imageSrc);
    return (
      <NanmaImageEditor
        imageSrc={this.props.imageSrc || "#"}
      ></NanmaImageEditor>
    );
  }
}

export default ImageEditorEditorApp;
