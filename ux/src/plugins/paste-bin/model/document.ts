import {
  IDocument,
  // DocumentId,
  // DocumentType,
  IDocumentStore,
  IUpdateDocument,
} from "../paste-bin.types";
import { v4 } from "uuid";
import { AsyncIndexDBStorage, IAsyncStorage } from "../../../cache";
import { PASTE_BIN_PLUGIN_NAME } from "../paste-bin.constants";

let storage: IAsyncStorage; // = new AsyncIndexDBStorage(config);

const documentStore: IDocumentStore = {
  save: async (updated: IUpdateDocument, old: IDocument) => {
    console.log("Save", updated, old);
    if (old?._rev) {
      console.log("Update");
      return ((await storage.setItem(old.id, {
        ...old,
        ...updated,
      })) as unknown) as IDocument;
    }

    const id = v4();
    console.log("SaInsert", id);
    return ((await storage.addItem({
      ...old,
      ...updated,
      id,
    })) as unknown) as IDocument;
  },
  getAll: async () => {
    storage = new AsyncIndexDBStorage(PASTE_BIN_PLUGIN_NAME);
    const result = await storage.getAll();
    const records = result.rows.map(
      (row): IDocument => {
        const document = row.doc as IDocument;
        return document;
      }
    );
    console.log(records);
    return records;
  },
  get: async (id: string) => {
    storage = new AsyncIndexDBStorage(PASTE_BIN_PLUGIN_NAME);
    const result = await storage.getItem(id);
    return (result as unknown) as IDocument;
  },
} as IDocumentStore;

export { documentStore };
