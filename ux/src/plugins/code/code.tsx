import "../../global.d.ts";

import BaseComponent from "../../components/base/component";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import React from "react";
import SelectLanguage from "../../components/dropdown/language";

//import { context } from "../../app";

// const dropdownStyles: Partial<IDropdownStyles> = {
//   dropdown: { width: 200, right: 0, position: "absolute", zIndex: 1000 },
// };

interface Props {
  language?: string;
  data?: string;
}

let modal: import("monaco-editor").editor.ITextModel | null = null;
// let editorInstance: import("monaco-editor").editor.IStandaloneCodeEditor;

export default class CodeView extends BaseComponent<any, any> {
  private editorPanel: HTMLDivElement | null;

  constructor(props: Props) {
    super(props);
    this.editorPanel = null;
    this.state = {
      language: "typescript",
    };
  }
  setCodeView = async () => {
    const { editor, Uri } = await import("monaco-editor");
    if (!modal) {
      modal = editor.createModel(
        this.props.data,
        this.state.language,
        Uri.parse(this.props.url)
      );
    }
    if (this.editorPanel) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      // editorInstance =
      editor.create(this.editorPanel, {
        //@ts-ignore
        model: modal,
        theme: "vs-dark",
        automaticLayout: true,
        fontLigatures: true,
        fontFamily: "Fira code",
        fontSize: 12,
      });
    }
    if (this.props.data) {
      modal.setValue(this.props.data);
      console.log("VALUE", modal.getValue());
    }
  };

  componentDidMount = async () => {
    if (!this.editorPanel) return;
    this.setCodeView();
  };
  onLangaugeChange = async (_: React.FormEvent, option?: IDropdownOption) => {
    const { editor } = await import("monaco-editor");
    modal && editor.setModelLanguage(modal, option?.id || "typescript");
  };

  render() {
    return (
      <>
        <SelectLanguage onChange={this.onLangaugeChange}></SelectLanguage>
        <div
          style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
          ref={(ele) => {
            this.editorPanel = ele;
          }}
        ></div>
      </>
    );
  }
}
