import React from "react";
import NanmaImageEditor from "../../components/image-editor";

class ImageEditorEditorApp extends React.Component<any, any> {
  // constructor(props: any) {
  //   super(props);
  // }

  render() {
    return (
      <NanmaImageEditor
        imageSrc={this.props.imageSrc || "#"}
      ></NanmaImageEditor>
    );
  }
}

export default ImageEditorEditorApp;
