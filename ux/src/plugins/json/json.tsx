import BaseComponent from "../../components/base/component";
import React from "react";

type JSONEditorType = import("jsoneditor").default;

class IEditorRef {
  constructor(
    public element: HTMLDivElement | undefined = undefined,
    public editor: JSONEditorType | undefined = undefined
  ) {}
}

type IEditorRefRecord = Record<string, IEditorRef>;

class JsonEditorApp extends BaseComponent<any, any> {
  private jsonEditor: IEditorRefRecord;
  constructor(props: any) {
    super(props);
    this.jsonEditor = {
      code: new IEditorRef(),
      tree: new IEditorRef(),
    };
  }

  createJsonEditorRef = (type: string) => (ele: HTMLDivElement) => {
    this.jsonEditor[type].element = ele;
  };
  componentDidMount = async () => {
    const JSONEditor = (await import("jsoneditor")).default;
    // @ts-ignore
    import("jsoneditor/dist/jsoneditor.min.css");
    const self = this;
    const setEditorValue = (editor: JSONEditorType, value: any) => {
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
          onChangeText: function (jsonString: string) {
            self.jsonEditor.tree.editor?.updateText(jsonString);
          },
        }
      );
      //@ts-ignore
      setEditorValue(self.jsonEditor.code.editor, this.props.data);
    }
    if (self.jsonEditor.tree.element) {
      self.jsonEditor.tree.editor = new JSONEditor(
        self.jsonEditor.tree.element,
        {
          mode: "tree",
          onChangeText: function (jsonString: string) {
            self.jsonEditor?.code?.editor?.updateText(jsonString);
          },
        }
      );
      //@ts-ignore
      setEditorValue(self.jsonEditor.tree.editor, this.props.data);
    }
  };
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
        ref={(ele) => {
          window.document.body.style.backgroundColor = "white";
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

export default JsonEditorApp;
