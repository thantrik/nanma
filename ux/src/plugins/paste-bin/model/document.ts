import {
  IDocument,
  DocumentId,
  DocumentType,
  IDocumentStore,
  IUpdateDocument,
} from "../paste-bin.types";

const documentStore: IDocumentStore = {
  save: (updated: IUpdateDocument, old: IDocument) =>
    Promise.resolve(documents[0]),
  getAll: () => Promise.resolve(documents),
  get: (id: string) => Promise.resolve(documents[0]),
} as IDocumentStore;

const documents: IDocument[] = [
  {
    meta: {
      id: "doc-id-0",
      created: new Date(),
      size: 10,
      title: "This doc",
      updated: new Date(),
    },
    content: "content",
    link: {
      children: new Map<DocumentId, IDocument>(),
      type: DocumentType.file,
    },
  },
];

export { documentStore };
