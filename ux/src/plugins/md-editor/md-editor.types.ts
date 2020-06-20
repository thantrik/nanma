export * from "./md-editor.constants";
export type MdEditorType = { [key: string]: any } | string;

export interface IState {
  data: MdEditorType;
  readOnly: boolean;
}
