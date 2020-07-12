import { Document, DocumentId, IDocument } from "./paste-bin.types";
import React, { createRef } from "react";

import DocumentEditor from "./components/editor";
import { DocumentList } from "./components/list/index";
import { DocumentTitle } from "./components/document-title";
import { debounce } from "lodash";
import { documentStore } from "./model/document";
import { toDayString } from "../../lib/toDayString";

interface PasteBinEditorState {
  documents: Map<DocumentId, Document>;
  activeDocument: Document;
  root: DocumentId;
}
class PasteBinEditorApp extends React.Component<
  any,
  {
    documents: Map<DocumentId, Document>;
    activeDocument: Document;
    root: Document;
  }
> {
  content = createRef<HTMLDivElement>();
  titleInput = createRef<HTMLInputElement>();

  constructor(props: any) {
    super(props);
    const newDocument = new Document();
    this.state = {
      documents: new Map<DocumentId, IDocument>([
        [newDocument.id, newDocument],
      ]),
      activeDocument: newDocument,
      root: newDocument,
    };
  }

  componentDidMount() {
    this.getAllDocuments();
  }
  getAllDocuments = async () => {
    const newMap = new Map<DocumentId, IDocument>();
    try {
      const documents = await documentStore.getAll();
      let activeDocument = this.state.activeDocument;
      console.log("document", documents);
      documents.forEach((document: IDocument) => {
        newMap.set(document.id, document);
        if (activeDocument?.id === document.id && document._rev) {
          activeDocument._rev = document._rev;
        }
      });
      this.setState({
        documents: newMap,
        activeDocument:
          activeDocument && activeDocument._rev ? activeDocument : documents[0],
        root: documents[0],
      });
    } catch (err) {
      console.error(err);
    }
  };
  dataUpdate = async (content: string) => {
    content = btoa(content);
    const title = this.content.current?.innerText
      ? this.content.current?.innerText.trimStart().substring(0, 30).trim()
      : toDayString();
    if (!this.titleInput.current?.value) {
      this.titleInput.current && (this.titleInput.current.value = title);
    }
    try {
      await documentStore.save({ title, content }, this.state.activeDocument);
    } catch (err) {
      console.log("Error on updating", err);
    }
    await this.getAllDocuments();
  };
  delayedDataUpdate = debounce(this.dataUpdate, 2500, { maxWait: 2000 });
  onTitleChange = debounce(async (title: string) => {
    await documentStore.save(
      {
        title,
      },
      this.state.activeDocument
    );
  }, 600);
  render() {
    const { meta: { title = toDayString() } = {} } =
      this.state.activeDocument || {};
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "row",
          alignItems: "space-around",
          justifyContent: "space-around",
          boxSizing: "border-box",
          fontFamily: "Fira Code",
        }}
      >
        <div
          style={{
            width: "15%",
            minHeight: "100vh",
            zoom: 0.8,
            background: "linear-gradient(180deg, white, #EFEFFE)",
            wordWrap: "break-word",
          }}
        >
          <DocumentList documents={this.state.documents}></DocumentList>
          <DocumentTitle
            onChange={this.onTitleChange}
            defaultValue={title}
          ></DocumentTitle>
        </div>
        <div
          style={{
            width: "85%",
            minHeight: "100vh",
            outline: "none",
          }}
        >
          <DocumentEditor
            onUpdate={this.delayedDataUpdate}
            onSave={this.dataUpdate}
            {...this.state.activeDocument}
          ></DocumentEditor>
        </div>
      </div>
    );
  }
}

export default PasteBinEditorApp;
