import { AsyncIndexDBStorage, IAsyncStorage } from "../../cache";
import { JSON_PLUGIN_NAME } from "./json.constants";
import { JsonSnippetRecord } from "./json.types";
import { debounce } from "lodash";

let storage: IAsyncStorage; // = new AsyncIndexDBStorage(config);

export class JsonViewStore {
  static getAll = async (): Promise<JsonSnippetRecord[]> => {
    storage = new AsyncIndexDBStorage(JSON_PLUGIN_NAME);
    const result = await storage.getAll();
    const records = result.rows.map(
      (row): JsonSnippetRecord => {
        const json = new JsonSnippetRecord(row.doc);
        return json;
      }
    );
    return records;
  };
  static save = debounce(
    async (record: JsonSnippetRecord) => await storage.addItem(record),
    1000,
    { maxWait: 1500 }
  );
}
// toJSON = (): IDoc => this.toDoc();
// save = async () => await storage.addItem(this.toDoc());
// public static getAll = async (
//   json: boolean = false
// ): Promise<MyWebSnippetsModal[]> => {
//   storage = new AsyncIndexDBStorage(MYWEB_PLUGIN_NAME);
//   const result = await storage.getAll();
//   const records = result.rows.map((row): MyWebSnippetsModal | any => {
//     const snippet = new MyWebSnippetsModal(row.doc);
//     if (json) return snippet.toJSON();
//     return snippet;
//   });
//   return records;
// };
// public static getJsonRecords = async () => {
//   storage = new AsyncIndexDBStorage(MYWEB_PLUGIN_NAME);
//   const result = await storage.getAll();
//   const records = result.rows.map((row) =>
//     new MyWebSnippetsModal(row.doc).toJSON()
//   );
//   return records;
// };
