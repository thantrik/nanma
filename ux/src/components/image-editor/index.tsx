import React from "react";
import ImageEditor from "@toast-ui/react-image-editor";

import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "./overrides.css";

const myTheme = {
  "common.bi.image": "none",
  "common.backgroundImage": "none",
  // Theme object to extends default dark theme.
};

const NanmaImageEditor = ({ imageSrc }: { imageSrc?: string }) => (
  <ImageEditor
    includeUI={{
      loadImage: {
        path: imageSrc,
        name: imageSrc,
      },
      theme: myTheme,
      uiSize: {
        width: "100vw",
        height: "100vh",
      },
      menuBarPosition: "top",
    }}
    cssMaxHeight={document.body.clientHeight}
    cssMaxWidth={document.body.clientWidth * 0.9}
    selectionStyle={{
      cornerSize: 2,
      rotatingPointOffset: 0,
    }}
    usageStatistics={false}
  />
);

export default NanmaImageEditor;
