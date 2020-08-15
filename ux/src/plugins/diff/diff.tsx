import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "office-ui-fabric-react/lib/Dropdown";

import BaseComponent from "../../components/base/component";
import React from "react";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200, right: 0, position: "absolute", zIndex: 1000 },
};

type DiffViewType = HTMLDivElement | null;

class DiffView extends BaseComponent<any, any> {
  private diffView: DiffViewType = null;
  private options: IDropdownOption[] = [];
  constructor(props: {}) {
    super(props);
    this.state = {
      language: "TypeScript",
    };
    (async () => {
      // @ts-ignore
      const langs = import("monaco-editor").languages.getLanguages();
      this.options = langs.map(
        (language: any): IDropdownOption => ({
          key: language.aliases?.[0] || "",
          text: language.aliases?.[0] || "",
          data: language.mimetypes,
        })
      );
    })();
  }
  componentDidMount = async () => {
    if (!this.diffView) return;
    const { editor } = await import("monaco-editor");
    // The diff editor offers a navigator to jump between changes. Once the diff is computed the <em>next()</em> and <em>previous()</em> method allow navigation. By default setting the selection in the editor manually resets the navigation state.
    var originalModel = editor.createModel("", this.state.language);
    var modifiedModel = editor.createModel("", this.state.language);

    var diffEditor = editor.createDiffEditor(this.diffView, {
      originalEditable: true,
      contextmenu: true,
      renderSideBySide: true,
      fontLigatures: true,
      fontFamily: "Fira code",
      fontSize: 12,
    });
    diffEditor.setModel({
      original: originalModel,
      modified: modifiedModel,
    });
  };
  selectLanguage = (_: any, option: IDropdownOption | undefined) => {
    this.setState({
      language: option?.text || "TypeScript",
    });
  };
  render() {
    return (
      <>
        <Dropdown
          placeholder="Language"
          options={this.options}
          styles={dropdownStyles}
          onChange={this.selectLanguage}
        />

        <div
          ref={(ele) => (this.diffView = ele)}
          style={{
            width: "100vw",
            height: "100vh",
          }}
        ></div>
      </>
    );
  }
}

export default DiffView;
