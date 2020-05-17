import React from "react";
import * as monaco from "monaco-editor";
import "../../global.d.ts";
interface Props {
  language?: string;
  data?: string;
}

export default class CodeView extends React.Component<any, any> {
  private editorPanel: HTMLDivElement | null;
  constructor(props: Props) {
    super(props);
    this.editorPanel = null;
  }
  componentDidMount() {
    if (this.editorPanel) {
      monaco.editor.create(this.editorPanel, {
        //@ts-ignore
        value: this.props.data,
        theme: "vs-dark",
        language: this.props.language,
      });
    }
  }
  render() {
    return (
      <div
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        ref={(ele) => (this.editorPanel = ele)}
      ></div>
    );
  }
}
