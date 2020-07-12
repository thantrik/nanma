import { Document, DocumentId, IDocument } from "./paste-bin.types";
import React, { createRef } from "react";

import { DocumentAction } from "./actions";
import DocumentEditor from "./components/editor";
import { DocumentList } from "./components/list/index";
import { DocumentTitle } from "./components/document-title";
import { debounce } from "lodash";
import { documentStore } from "./model/document";
import { toDayString } from "../../lib/toDayString";

interface PasteBinEditorState {
  documents: Map<DocumentId, Document>;
  activeDocument: Document;
  root: Document;
}
class PasteBinEditorApp extends React.Component<any, PasteBinEditorState> {
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
    this.setState.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.getAllDocuments(), 0);
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

    try {
      await documentStore.save(
        { title: this.getTitle(), content },
        this.state.activeDocument
      );
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
  getTitle = (): string => {
    const title = this.content.current?.innerText
      ? this.content.current?.innerText.trimStart().substring(0, 30).trim()
      : toDayString();
    if (!this.titleInput.current?.value) {
      this.titleInput.current && (this.titleInput.current.value = title);
    }
    return title;
  };
  onAction = async (type: DocumentAction): Promise<Document> => {
    switch (type) {
      case DocumentAction.NewFile:
        console.log("create document");
        break;
      case DocumentAction.NewFolder:
        console.log("create file");
        break;
    }
    return Promise.resolve(new Document());
  };
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
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          <DocumentList
            documents={this.state.documents}
            onAction={this.onAction}
          ></DocumentList>
          <DocumentTitle
            onChange={this.onTitleChange}
            defaultValue={title}
          ></DocumentTitle>
        </div>
        <div
          style={{
            width: 2,
            minHeight: "100vh",
            background: "#EFEFEF",
            cursor: "col-resize",
            overflow: "hidden",
          }}
        ></div>
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
            onAction={this.onAction}
          ></DocumentEditor>
        </div>
      </div>
    );
  }
}

export default PasteBinEditorApp;
