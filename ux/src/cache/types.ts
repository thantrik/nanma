export interface IAsyncStorage {
  getItem: (id: string) => Promise<PouchDB.Core.Response>;
  setItem: (
    id: string,
    item: object | string
  ) => Promise<PouchDB.Core.Response>;
  addItem: (item: object | string) => Promise<PouchDB.Core.Response>;
  removeItem: (id: string) => Promise<PouchDB.Core.Response>;
  recycleBin: (id: string) => Promise<PouchDB.Core.Response>;
  getAll: () => Promise<PouchDB.Core.AllDocsResponse<any>>;
}
