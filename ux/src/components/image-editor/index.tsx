import React from "react";
import ImageEditor from "@toast-ui/react-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "./overrides.css";
import "file-saver/dist/FileSaver";

const myTheme = {
  "common.bi.image": "none",
  "common.backgroundImage": "none",
};

const NanmaImageEditor = ({
  imageSrc,
  imageName = `Screen-${Date.now().toString()}.jpg`,
}: {
  imageSrc?: string;
  imageName?: string;
}) => {
  console.log("imageSrc, imageName", imageSrc, imageName);
  return (
    <ImageEditor
      includeUI={{
        loadImage: {
          path: imageSrc,
          name: imageName,
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
};

export default NanmaImageEditor;

// //@ts-ignore
// import Sample from "./sample.jpg";
// var img = new Image();
// var c = document.createElement("canvas");
// var ctx = c.getContext("2d");

// img.onload = function () {
//   c.width = img.naturalWidth; // update canvas size to match image
//   c.height = img.naturalHeight;
//   if (!ctx) return;
//   ctx.drawImage(img, 0, 0); // draw in image
//   c.toBlob(
//     function (blob) {
//       const url = URL.createObjectURL(blob);
//       console.log(url);
//       ReactDOM.render(
//         <React.StrictMode>
//           <NanmaImageEditor imageSrc={url} />
//         </React.StrictMode>,
//         document.body
//       );
//     },
//     "image/jpeg",
//     0.75
//   );
// };
// img.crossOrigin = ""; // if from different origin
// img.src = Sample;
