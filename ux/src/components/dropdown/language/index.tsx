import React from "react";
import * as monaco from "monaco-editor";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from "office-ui-fabric-react/lib/Dropdown";
import { DropdownOption } from "bootstrap";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200, right: 0, position: "absolute", zIndex: 1000 },
};

interface Props {
  style?: IDropdownStyles;
  onChange?:
    | ((
        event: React.FormEvent,
        option?: IDropdownOption | undefined,
        index?: number | undefined
      ) => void)
    | undefined;
}

const options: IDropdownOption[] = monaco.languages.getLanguages().map(
  (language): IDropdownOption => ({
    key: language.id,
    text: language.aliases?.[0] || "",
    data: language.mimetypes,
    selected: false,
  })
);

export default class SelectLanguage extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      language: "TypeScript",
    };
  }

  onChange = (_: any, option: IDropdownOption | undefined) => {};
  componentDidMount() {}

  render() {
    return (
      <Dropdown
        placeholder="Language"
        options={options}
        styles={this.props.style || dropdownStyles}
        onChange={this.props.onChange}
      />
    );
  }
}
