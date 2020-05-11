declare global {
  interface Window {
    jsonView: () => void;
    __REDUX_DEVTOOLS_EXTENSION__: Function;
    ___DATA: any;
  }
}

type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
