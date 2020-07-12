import { getDataBase } from "./database";
import { v4 } from "uuid";
import { IAsyncStorage } from "../types";

export class AsyncIndexDBStorage implements IAsyncStorage {
  private db: PouchDB.Database;
  constructor(name?: string) {
    this.db = getDataBase(name);
  }
  setItem = (
    _id: string = v4(),
    item: object | string
  ): Promise<PouchDB.Core.Response> =>
    this.db.put(
      typeof item === "object"
        ? {
            _id,
            ...item,
          }
        : { _id, item }
    );
  getItem = (id: string): Promise<PouchDB.Core.Response> => this.db.get(id);
  addItem = (item: object | string) => this.setItem(v4(), item);
  removeItem = (id: string): Promise<PouchDB.Core.Response> =>
    this.db.get(id).then(this.db.remove);
  recycleBin = (id: string): Promise<PouchDB.Core.Response> =>
    this.db
      .get(id)
      .then((doc) =>
        this.db.put({ ...doc, is_deleted: true, deleted: Date.now() })
      );
  getAll = () =>
    this.db.allDocs({
      include_docs: true,
      attachments: true,
    });
}
