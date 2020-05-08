import React from "react";
import JSONEditor from "jsoneditor";

import "jsoneditor/dist/jsoneditor.min.css";

class IEditorRef {
  constructor(
    public element: HTMLDivElement | undefined = undefined,
    public editor: JSONEditor | undefined = undefined
  ) {}
}

type IEditorRefRecord = Record<string, IEditorRef>;

class JSONEditorApp extends React.Component {
  private jsonEditor: IEditorRefRecord;
  constructor(props: {}) {
    super(props);
    this.jsonEditor = {
      code: new IEditorRef(),
      tree: new IEditorRef(),
    };
  }

  createJsonEditorRef = (type: string) => (ele: HTMLDivElement) => {
    this.jsonEditor[type].element = ele;
  };
  componentDidMount() {
    const self = this;
    const setEditorValue = (editor: JSONEditor, value: any) => {
      if (!editor) return;
      if (!value) return;
      switch (typeof value) {
        case "string":
          editor.setText(value);
          break;
        case "object":
        default:
          editor.set(value);
      }
    };
    if (this.jsonEditor?.code?.element) {
      self.jsonEditor.code.editor = new JSONEditor(
        this.jsonEditor.code.element,
        {
          mode: "text",
          onChangeText: function (jsonString) {
            self.jsonEditor.tree.editor?.updateText(jsonString);
          },
        }
      );
      //@ts-ignore
      setEditorValue(self.jsonEditor.code.editor, window.___JSON);
    }
    if (self.jsonEditor.tree.element) {
      self.jsonEditor.tree.editor = new JSONEditor(
        self.jsonEditor.tree.element,
        {
          mode: "tree",
          onChangeText: function (jsonString) {
            self.jsonEditor?.code?.editor?.updateText(jsonString);
          },
        }
      );
      //@ts-ignore
      setEditorValue(self.jsonEditor.tree.editor, window.___JSON);
    }
  }
  render() {
    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "space-around",
          justifyContent: "space-around",
        }}
      >
        <div
          ref={this.createJsonEditorRef("code")}
          style={{ width: "50vw", height: "100vh" }}
        ></div>
        <div
          ref={this.createJsonEditorRef("tree")}
          style={{ width: "50vw", height: "100vh" }}
        ></div>
      </div>
    );
  }
}

export default JSONEditorApp;
