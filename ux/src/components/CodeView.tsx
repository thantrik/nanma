import React from "react";

interface Props {
  language?: string;
  data?: string;
}

export default class CodeView extends React.Component<Props, {}> {
  private editorPanel: HTMLDivElement | null;
  constructor(props: Props) {
    super(props);
    this.editorPanel = null;
  }
  componentDidMount = async () => {
    const monaco = await import("monaco-editor");

    //@ts-ignore
    import("./index.css");
    if (this.editorPanel) {
      monaco.editor.create(this.editorPanel, {
        value: this.props.data,
        theme: "vs-dark",
        language: this.props.language,
      });
    }
  };
  render() {
    return (
      <div
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
        ref={(ele) => (this.editorPanel = ele)}
      ></div>
    );
  }
}
