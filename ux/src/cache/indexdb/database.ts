import PouchDB from "pouchdb";
import { name } from "../../../package.json";

const db: PouchDB.Database = new PouchDB(name);
const pluginDB: { [key: string]: PouchDB.Database } = {};

const getPluginDatabase = (name: string): PouchDB.Database => {
  if (!pluginDB[name]) {
    pluginDB[name] = new PouchDB(name);
  }
  return pluginDB[name];
};

export const getDataBase = (name?: string): PouchDB.Database => {
  return name ? getPluginDatabase(name) : db;
};
