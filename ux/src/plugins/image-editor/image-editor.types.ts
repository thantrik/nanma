export * from "./image-editor.constants";
export type ImageEditorType = { [key: string]: any } | string;

export interface IState {
  withImage: boolean;
  imageSrc: string;
  imageName?: string;
}
