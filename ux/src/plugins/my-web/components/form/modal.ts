import { v4 } from "uuid";
import { AsyncIndexDBStorage, IAsyncStorage } from "../../../../cache";
import { MYWEB_PLUGIN_NAME } from "../../../my-web/my-web.constants";

let storage: IAsyncStorage; // = new AsyncIndexDBStorage(config);

type IDoc = Record<string, any>;
interface IModal {
  toDoc: () => IDoc;
  toJSON: () => IDoc;
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

  toDoc = (): IDoc => {
    return {
      id: this._id,
      test: this._test,
      script: this._script,
      css: this._css,
    };
  };
  toJSON = (): IDoc => this.toDoc();
  save = async () => await storage.addItem(this.toDoc());
  public static getAll = async (json: boolean = false) => {
    storage = new AsyncIndexDBStorage(MYWEB_PLUGIN_NAME);
    const result = await storage.getAll();
    const records = result.rows.map((row) => {
      const snippet = new MyWebSnippetsModal(row.doc);
      if (json) return snippet.toJSON();
      return snippet;
    });
    return records;
  };
  public static getJsonRecords = async () => {
    storage = new AsyncIndexDBStorage(MYWEB_PLUGIN_NAME);
    const result = await storage.getAll();
    const records = result.rows.map((row) =>
      new MyWebSnippetsModal(row.doc).toJSON()
    );
    return records;
  };
}
