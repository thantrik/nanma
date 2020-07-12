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
  super = "superStar",
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
export interface IDocumentLink {
  type: DocumentType;
  children: Map<DocumentId, IDocument>;
}
export interface IDocument {
  _rev: string;
  id: DocumentId;
  meta: DocumentMeta;
  content: string;
  link: IDocumentLink;
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
  public link: IDocumentLink;
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
    this.link = doc?.link || {
      type: DocumentType.file,
      children: new Map(),
    };
  }
}

export interface IDocumentStore {
  save: (updated: IUpdateDocument, old: IDocument) => Promise<IDocument>;
  getAll: () => Promise<IDocument[]>;
  get: (id: string) => Promise<IDocument>;
}
