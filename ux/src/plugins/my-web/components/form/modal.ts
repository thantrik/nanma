import { v4 } from "uuid";
import { AsyncIndexDBStorage, IAsyncStorage } from "../../../../app";
import config from "../../../my-web/my-web.config";

let storage: IAsyncStorage; // = new AsyncIndexDBStorage(config);

type IDoc = object & { _id: string };
interface IModal {
  toDoc: () => IDoc;
  //   toJSON: () => {};
  //   toString: () => {};
  //   from: () => {};
}

export interface IMyWebSnippetsModal {
  test: RegExp;
  css: string[];
  script: string[];
}

export class MyWebSnippetsModal implements IMyWebSnippetsModal, IModal {
  private _test: RegExp;
  private _css: string[] = [];
  private _script: string[] = [];
  private _id: string;

  public get id() {
    return this._id;
  }

  public get test() {
    return this._test;
  }
  public set test(_test: RegExp) {
    this._test = _test;
  }
  get css() {
    return this._css;
  }
  set css(css: string[]) {
    this._css = css;
  }
  public addCss = (css: string) => {
    this._css.push(css);
  };

  get script() {
    return this._script;
  }
  set script(script: string[]) {
    this.script = script;
  }
  public addScript = (script: string) => {
    this._script.push(script);
  };

  constructor(doc: IMyWebSnippetsModal & IDoc) {
    this._test = doc.test;
    this._script = doc.script;
    this._css = doc.css;
    this._id = doc._id || v4();
  }

  toDoc = (): any => {
    return {
      test: this._test,
      script: this._script,
      css: this._css,
    };
  };
  save = async () => await storage.addItem(this.toDoc());
  public static getAll = async () => {
    storage = new AsyncIndexDBStorage(config);
    const result = await storage.getAll();
    console.log(result);
    const records = result.rows.map((row) => new MyWebSnippetsModal(row.doc));
    return records;
  };
}
