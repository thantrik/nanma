import PouchDB from "pouchdb";
import { getDataBase } from "./database";
import { v4 } from "uuid";

export default function IndexDBStorage() {
  const db = getDataBase();
  return {
    getItem: (id: string): Promise<PouchDB.Core.Response> => db.get(id),
    setItem: (
      id: string,
      item: object | string
    ): Promise<PouchDB.Core.Response> =>
      db.put(
        typeof item === "object"
          ? {
              id: v4(),
              ...item,
            }
          : { id: v4(), item }
      ),
    removeItem: (id: string): Promise<PouchDB.Core.Response> =>
      db.get(id).then(db.remove),
  };
}
