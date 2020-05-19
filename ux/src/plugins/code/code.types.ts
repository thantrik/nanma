export { GET_DATA, SET_DATA } from "./code.constants";
export type CodeType = string;

export interface IState {
  data: CodeType;
  language?: string;
  url: string;
}
