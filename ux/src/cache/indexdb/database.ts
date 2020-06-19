import PouchDB from "pouchdb";
import { name } from "../../../package.json";

let db: PouchDB.Database;
const pluginDB: { [key: string]: PouchDB.Database } = {};

const getPluginDatabase = (name: string): PouchDB.Database => {
  if (!pluginDB[name]) {
    pluginDB[name] = new PouchDB(name);
  }
  return pluginDB[name];
};

export const getDataBase = (dbName: string = name): PouchDB.Database => {
  if (!db) db = new PouchDB(name);
  return dbName ? getPluginDatabase(dbName) : db;
};
