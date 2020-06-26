import { v4 } from "uuid";
import moment from "moment";

export type JsonType = { [key: string]: any } | string;
export * from "./json.constants";

export interface IJsonDataType {
  data: string;
}
export interface IState extends IJsonDataType {
  records: IJsonStoredRecord;
}

export interface IJsonStoredRecord {
  date: string;
  data: string;
  title: string;
  collection: string;
  id: string;
}

export class JsonSnippetRecord implements IJsonStoredRecord {
  public data: string;
  public date: string;
  public title: string;
  public collection: string;
  public id: string;
  constructor(doc: Partial<IJsonStoredRecord> & { _id?: string }) {
    this.id = doc._id || v4();
    this.data = doc.data || "{}";
    this.date = doc.date || moment.now().toString();
    this.title = doc.title || moment().format();
    this.collection = doc.collection || "default";
  }
}
