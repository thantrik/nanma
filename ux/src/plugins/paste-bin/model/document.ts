import { AsyncIndexDBStorage, IAsyncStorage } from "../../../cache";
import {
  Document,
  IDocument,
  IDocumentStore,
  IUpdateDocument,
} from "../paste-bin.types";

import { PASTE_BIN_PLUGIN_NAME } from "../paste-bin.constants";
import { v4 } from "uuid";

let storage: IAsyncStorage; // = new AsyncIndexDBStorage(config);

const documentStore: IDocumentStore = {
  save: async (updated: IUpdateDocument, old: IDocument) => {
    console.log("%cSave", "color: teal", updated, old);
    if (old?._rev) {
      console.log("%cDocument Update", "color: green");
      return ((await storage.setItem(old.id, {
        ...old,
        ...updated,
      })) as unknown) as IDocument;
    }

    const id = v4();
    console.log("%cDocument Insert", "color: orange", id);
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
        const document = new Document(row.doc as Document);
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
  recycleBin: async (id: string) => {
    storage = new AsyncIndexDBStorage(PASTE_BIN_PLUGIN_NAME);
    const result = await storage.recycleBin(id);
    return (result as unknown) as IDocument;
  },
  remove: async (id: string) => {
    storage = new AsyncIndexDBStorage(PASTE_BIN_PLUGIN_NAME);
    const result = await storage.removeItem(id);
    return (result as unknown) as IDocument;
  },
} as IDocumentStore;

export { documentStore };
