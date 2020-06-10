import React from "react";
import * as monaco from "monaco-editor";

interface Props {
  language: string;
  data: string;
  height?: string | number;
  width?: string | number;
}

export default class CodeField extends React.Component<Props, {}> {
  private editorPanel: HTMLDivElement | null;
  private modal: monaco.editor.ITextModel | null;
  private editor: monaco.editor.IStandaloneCodeEditor | null;

  constructor(props: Props) {
    super(props);
    this.editorPanel = null;
    this.modal = null;
    this.editor = null;
  }
  setCodeView = () => {
    if (!this.modal) {
      this.modal = monaco.editor.createModel(
        this.props.data,
        this.props.language
      );
    }
    if (this.editorPanel) {
      this.editor = monaco.editor.create(this.editorPanel, {
        //@ts-ignore
        model: this.modal,
        theme: "vs-dark",
        automaticLayout: true,
        lineNumbers: "off",
        codeLens: false,
        fontSize: 12,
        glyphMargin: false,
        minimap: {
          enabled: false,
        },
      });
    }
    if (this.props.data) {
      this.modal.setValue(this.props.data);
    }
  };

  componentDidMount() {
    if (!this.editorPanel) return;
    this.setCodeView();
  }
  public get value(): string {
    return this.modal ? this.modal.getValue() : "";
  }

  render() {
    const { height = 200, width = "100%" } = this.props;
    return (
      <div
        style={{ width, height, overflow: "hidden" }}
        ref={(ele) => {
          this.editorPanel = ele;
        }}
      ></div>
    );
  }
}
