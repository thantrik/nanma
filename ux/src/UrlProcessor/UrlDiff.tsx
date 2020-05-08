import React from "react";
import * as monaco from "monaco-editor";
import debounce from "lodash/debounce";

export default class UrlDiff extends React.Component {
  instanceDiffView: HTMLDivElement | null;
  diffEditor: monaco.editor.IStandaloneDiffEditor | null;
  //@ts-ignore
  lhsTextArea: HTMLTextAreaElement;
  //@ts-ignore
  rhsTextArea: HTMLTextAreaElement;
  constructor(props: {}) {
    super(props);
    this.instanceDiffView = null;
    this.diffEditor = null;
  }
  updateDiffView = () => {
    if (!this.diffEditor) return;
    const lhsData = this.lhsTextArea?.value || "";
    const rhsData = this.rhsTextArea?.value || "";
    var lhsModel = monaco.editor.createModel(lhsData, "text/javascript");
    var rhsModel = monaco.editor.createModel(rhsData, "text/javascript");

    this.diffEditor.setModel({
      original: lhsModel,
      modified: rhsModel,
    });
  };
  setDiffView = () => {
    if (this.instanceDiffView) {
      this.diffEditor = monaco.editor.createDiffEditor(this.instanceDiffView, {
        enableSplitViewResizing: true,
        theme: "vs-dark",
        renderSideBySide: true,
        originalEditable: true,
        folding: true,
      });

      var lhsModel = monaco.editor.createModel("", "text/javascript");
      var rhsModel = monaco.editor.createModel("", "text/javascript");

      this.diffEditor.setModel({
        original: lhsModel,
        modified: rhsModel,
      });
    }
  };
  componentDidMount() {
    this.setDiffView();
  }
  render() {
    return (
      <div>
        <div
          style={{ height: "100vh", width: "100vw" }}
          ref={(ele) => (this.instanceDiffView = ele)}
        ></div>
      </div>
    );
  }
}
