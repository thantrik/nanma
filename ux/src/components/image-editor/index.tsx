import "file-saver/dist/FileSaver";

import React, { Suspense, createRef } from "react";

import { IState } from "../../plugins/image-editor/image-editor.types";
import canvas from "./canvas.jpg";

const myTheme = {
  "common.bi.image": "none",
  "common.backgroundImage": "none",
  "colorpicker.button.border": "1px solid #1e1e1e",
  "colorpicker.title.color": "#fff",
  "menu.iconSize.width": "14px",
  "menu.iconSize.height": "14px",
  "submenu.iconSize.width": "22px",
  "submenu.iconSize.height": "12px",
};

const ImageEditor = React.lazy(() => import("@toast-ui/react-image-editor"));

class NanmaImageEditor extends React.Component<IState, IState> {
  private editorInstance = createRef<any>();
  constructor(props: IState) {
    super(props);
    this.state = {
      imageSrc: canvas,
      imageName: NanmaImageEditor.getNewImageName(),
    };
  }
  static getNewImageName = () =>
    `Image-${Date().replace(/ /gi, "-").split("-GMT")[0]}`;
  static getDerivedStateFromProps(props: IState, state: IState) {
    return {
      ...props,
      imageName: props.imageName || NanmaImageEditor.getNewImageName(),
    };
  }
  componentDidMount = async () => {
    // @ts-ignore
    import("tui-image-editor/dist/tui-image-editor.css");
    // @ts-ignore
    import("tui-color-picker/dist/tui-color-picker.css");
    // @ts-ignore
    import("./overrides.css");
  };
  componentDidUpdate() {
    type TuiImageEditor = import("tui-image-editor");
    const { imageSrc, imageName } = this.state;
    const editor = this.editorInstance.current
      ?.imageEditorInst as TuiImageEditor;
    if (!editor) console.log("No editor instance");
    console.log("imageSrc, imageName", imageSrc, imageName, this.state, editor);
    //@ts-ignore
    window.editor = editor;
    //@ts-ignore
    editor._invoker.unlock();
    //@ts-ignore
    editor
      .loadImageFromURL(imageSrc, imageName)
      .then(() => {
        //@ts-ignore
        editor.ui.activeMenuEvent();
        editor.clearUndoStack();

        imageSrc &&
          imageSrc.indexOf("blob") > -1 &&
          URL.revokeObjectURL(imageSrc);
      })
      .catch(console.log);
  }

  render() {
    const { imageSrc, imageName } = this.state;

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ImageEditor
          ref={this.editorInstance}
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
          cssMaxHeight={document.body.clientHeight * 0.8}
          cssMaxWidth={document.body.clientWidth * 0.8}
          selectionStyle={{
            cornerSize: 2,
            rotatingPointOffset: 0,
          }}
          usageStatistics={false}
        />
      </Suspense>
    );
  }
}

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
