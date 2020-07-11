import { toDayString } from "../../lib/toDayString";
import { v4 } from "uuid";
// import { PASTE_BIN_NEW_DOCUMENT } from "./paste-bin.constants";

export * from "./paste-bin.constants";

export enum DocumentType {
  file = "file",
  folder = "folder",
}

export type DocumentId = string;
export interface DocumentMeta {
  created: number;
  updated: number;
  title: string;
  size: number;
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
  constructor(doc?: Partial<IDocument>) {
    this.id = doc?.id || v4();
    this._rev = doc?._rev || "";
    this.meta = doc?.meta || {
      created: Date.now(),
      updated: Date.now(),
      title: toDayString(),
      size: 0,
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
