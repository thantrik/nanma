import { toDayString } from "../../lib/toDayString";
import { v4 } from "uuid";

// import { PASTE_BIN_NEW_DOCUMENT } from "./paste-bin.constants";

export * from "./paste-bin.constants";

export enum DocumentType {
  file = "file",
  folder = "folder",
}

export enum Flag {
  default = "default",
  star = "star",
  super = "super",
  lightning = "lightning",
  butterfly = "butterfly",
  schedule = "schedule",
  task = "task",
  bug = "bug",
  contact = "contact",
  pin = "pin",
  pink = "pink",
  favorite = "favorite",
  recycleBin = "recycle bin",
  settings = "settings",
  diamond = "diamond",
  important = "important",
}

export type DocumentId = string;
export interface DocumentMeta {
  created: number;
  updated: number;
  title: string;
  size: number;
  flag: {
    type: Flag;
    style: string;
  };
  tags: string[];
}

export interface IDocument {
  children: string[];
  type: DocumentType;
  _rev: string;
  id: DocumentId;
  meta: DocumentMeta;
  content: string;
  deleted: Date | undefined;
  is_deleted: boolean;
}

export interface IState {
  data: IDocument[];
}

export interface IUpdateDocument {
  title: string;
  content?: string;
}

export class Document implements IDocument {
  public _rev: string;
  public id: DocumentId;
  public meta: DocumentMeta;
  public content: string;
  public type: DocumentType;
  public children: DocumentId[];
  public is_deleted: boolean = false;
  public deleted: Date | undefined = undefined;
  constructor(doc?: Partial<IDocument>) {
    this.id = doc?.id || v4();
    this._rev = doc?._rev || "";
    this.meta = doc?.meta || {
      created: Date.now(),
      updated: Date.now(),
      title: toDayString(),
      size: 0,
      flag: {
        type: Flag.default,
        style: "color:inherit",
      },
      tags: [],
    };
    this.content = doc?.content || "";
    this.type = doc?.type || DocumentType.file;
    this.children = doc?.children || [];
  }
}

export interface IDocumentStore {
  save: (updated: IUpdateDocument, old: IDocument) => Promise<IDocument>;
  getAll: () => Promise<IDocument[]>;
  get: (id: string) => Promise<IDocument>;
}
