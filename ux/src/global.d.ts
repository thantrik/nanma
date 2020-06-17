declare global {
  interface Window {
    initializeView: () => void;
    __REDUX_DEVTOOLS_EXTENSION__: Function;
    ___DATA: any;
  }
}

type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

declare module "@toast-ui/react-image-editor";

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}
