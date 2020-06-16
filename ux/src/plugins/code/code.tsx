import React from "react";
import * as monaco from "monaco-editor";
import "../../global.d.ts";
//import { context } from "../../app";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import SelectLanguage from "../../components/dropdown/language";

// const dropdownStyles: Partial<IDropdownStyles> = {
//   dropdown: { width: 200, right: 0, position: "absolute", zIndex: 1000 },
// };

interface Props {
  language?: string;
  data?: string;
}

let modal: monaco.editor.ITextModel | null = null;
let editor: monaco.editor.IStandaloneCodeEditor;

export default class CodeView extends React.Component<any, any> {
  private editorPanel: HTMLDivElement | null;

  constructor(props: Props) {
    super(props);
    this.editorPanel = null;
    this.state = {
      language: "typescript",
    };
  }
  setCodeView = () => {
    if (!modal) {
      modal = monaco.editor.createModel(
        this.props.data,
        this.state.language,
        monaco.Uri.parse(this.props.url)
      );
    }
    if (this.editorPanel) {
      editor = monaco.editor.create(this.editorPanel, {
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

  componentDidMount() {
    if (!this.editorPanel) return;
    this.setCodeView();
  }
  onLangaugeChange = (_: React.FormEvent, option?: IDropdownOption): void => {
    modal && monaco.editor.setModelLanguage(modal, option?.id || "typescript");
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
