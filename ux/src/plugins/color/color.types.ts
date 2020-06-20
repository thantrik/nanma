export { COLOR_GET_DATA, COLOR_SET_DATA } from "./color.constants";
export type ColorType = { [key: string]: any } | string;

export interface IState {
  hexCode: ColorType;
}
