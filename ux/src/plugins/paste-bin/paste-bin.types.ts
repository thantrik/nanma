export * from "./paste-bin.constants";

export enum DocumentType {
  file = "file",
  folder = "folder",
}

export type DocumentId = string;
export interface DocumentMeta {
  id: DocumentId;
  created: Date;
  updated: Date;
  title: string;
  size: number;
}
export interface IDocumentLink {
  type: DocumentType;
  children: Map<DocumentId, IDocument>;
}
export interface IDocument {
  meta: DocumentMeta;
  content: string;
  link: IDocumentLink;
}

export interface IState {
  data: IDocument[];
}
