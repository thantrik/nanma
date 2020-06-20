export { CODE_GET_DATA, CODE_SET_DATA } from "./code.constants";
export type CodeType = string;

export interface IState {
  data: CodeType;
  language?: string;
  url: string;
}
