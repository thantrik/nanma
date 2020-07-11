import React, { createRef } from "react";
import { debounce } from "lodash";
import DocumentEditor from "./components/editor";
import { IDocument, DocumentId } from "./paste-bin.types";
import { DocumentList } from "./components/list/index";
import { toDayString } from "../../lib/toDayString";
import { documentStore } from "./model/document";
import { DocumentTitle } from "./components/document-title";

interface PasteBinEditorState {
  documents: Map<DocumentId, IDocument>;
  activeDocument: IDocument;
  root: DocumentId;
}
class PasteBinEditorApp extends React.Component<any, any> {
  content = createRef<HTMLDivElement>();
  titleInput = createRef<HTMLInputElement>();

  constructor(props: any) {
    super(props);
    this.state = {
      documents: new Map<DocumentId, IDocument>(),
      activeDocument: undefined,
      root: undefined,
    };
  }

  componentDidMount() {
    this.getAllDocuments();
  }
  getAllDocuments = async () => {
    const newMap = new Map<DocumentId, IDocument>();
    try {
      const documents = await documentStore.getAll();
      documents.forEach((document: IDocument) =>
        newMap.set(document.id, document)
      );
      this.setState({
        documents: newMap,
        activeDocument: this.state.activeDocument || documents[0],
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
    await documentStore.save({ title, content }, this.state.activeDocument);
    this.getAllDocuments();
  };
  onTitleChange = debounce(async (title: string) => {
    await documentStore.save(
      {
        title,
      },
      this.state.activeDocument
    );
  }, 600);
  render() {
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
          <DocumentList></DocumentList>
          <DocumentTitle onChange={this.onTitleChange}></DocumentTitle>
        </div>
        <div
          style={{
            width: "85%",
            minHeight: "100vh",
            outline: "none",
          }}
        >
          <DocumentEditor
            onUpdate={this.dataUpdate}
            {...this.state.activeDocument}
          ></DocumentEditor>
        </div>
      </div>
    );
  }
}

export default PasteBinEditorApp;
