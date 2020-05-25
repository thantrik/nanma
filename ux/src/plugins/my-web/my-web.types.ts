export * from "./my-web.constants";
export type MyWebType = { [key: string]: any } | string;

export interface IState {
  data: string;
}

export interface IMyWebSnippet {
  test: RegExp;
  scripts: string[];
  css: string[];
}
