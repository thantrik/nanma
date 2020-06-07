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
  id: string;
  script: string[];
  css: string[];
  test: RegExp;
  public addScript = (script: string) => {
    this.script.push(script);
  };

  constructor(doc: IMyWebSnippetsModal & IDoc) {
    this.test = doc.test;
    this.script = doc.script;
    this.css = doc.css;
    this.id = doc._id || v4();
  }

  toDoc = (): IDoc => {
    return {
      test: this.test,
      script: this.script,
      css: this.css,
      id: this.id,
    };
  };
  toJSON = (): IDoc => this.toDoc();
  save = async () => await storage.addItem(this.toDoc());
  public static getAll = async (
    json: boolean = false
  ): Promise<MyWebSnippetsModal[]> => {
    storage = new AsyncIndexDBStorage(MYWEB_PLUGIN_NAME);
    const result = await storage.getAll();
    const records = result.rows.map((row): MyWebSnippetsModal | any => {
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
