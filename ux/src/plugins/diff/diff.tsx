import React from "react";
import * as monaco from "monaco-editor";
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from "office-ui-fabric-react/lib/Dropdown";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200, right: 0, position: "absolute", zIndex: 1000 },
};

type DiffViewType = HTMLDivElement | null;

class DiffView extends React.Component<any, any> {
  private diffView: DiffViewType = null;
  private options: IDropdownOption[] = monaco.languages.getLanguages().map(
    (language): IDropdownOption => ({
      key: language.aliases?.[0] || "",
      text: language.aliases?.[0] || "",
      data: language.mimetypes,
    })
  );
  constructor(props: {}) {
    super(props);
    this.state = {
      language: "TypeScript",
    };
  }
  componentDidMount() {
    if (!this.diffView) return;
    // The diff editor offers a navigator to jump between changes. Once the diff is computed the <em>next()</em> and <em>previous()</em> method allow navigation. By default setting the selection in the editor manually resets the navigation state.
    var originalModel = monaco.editor.createModel("", this.state.language);
    var modifiedModel = monaco.editor.createModel("", this.state.language);

    var diffEditor = monaco.editor.createDiffEditor(this.diffView, {
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
  }
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
