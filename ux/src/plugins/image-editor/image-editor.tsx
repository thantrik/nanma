import BaseComponent from "../../components/base/component";
import { IState } from "../image-editor/image-editor.types";
import NanmaImageEditor from "../../components/image-editor";
import React from "react";

class ImageEditorEditorApp extends BaseComponent<IState, any> {
  // constructor(props: any) {
  //   super(props);
  // }

  render() {
    console.log("this.props.imageSrc", this.props);

    return (
      <NanmaImageEditor
        imageSrc={this.props.imageSrc}
        imageName={this.props.imageName}
      ></NanmaImageEditor>
    );
  }
}

export default ImageEditorEditorApp;
