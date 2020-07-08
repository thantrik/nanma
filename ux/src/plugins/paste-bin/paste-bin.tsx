import React, { createRef, useRef, useState, useCallback } from "react";
import moment from "moment";
import { debounce } from "lodash";
import DocumentEditor from "./components/editor";
import { IDocument, DocumentId, DocumentType } from "./paste-bin.types";
import { DocumentList } from "./components/list/index";

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

interface IUpdateDocument {
  title: string;
  content?: string;
}

interface IDocumentStore {
  save: (updated: IUpdateDocument, old: IDocument) => Promise<IDocument>;
  getAll: () => Promise<IDocument[]>;
  get: (id: string) => Promise<IDocument>;
}

const documentStore: IDocumentStore = {
  save: (updated: IUpdateDocument, old: IDocument) =>
    Promise.resolve(documents[0]),
  getAll: () => Promise.resolve(documents),
  get: (id: string) => Promise.resolve(documents[0]),
} as IDocumentStore;

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
      activeDocument: documents[0],
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
        newMap.set(document.meta.id, document)
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
            width: 200,
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
            width: "calc(100vw - 202px)",
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

const toDayString = () => moment().format("MMMM DoYYYY, h:mm:ss a");

const DocumentTitle = ({
  onChange,
  defaultValue = toDayString(),
}: {
  onChange?: (v: string) => void;
  defaultValue?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(defaultValue);

  const handleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let { value } = event.target;
      value = value || toDayString();
      setValue(value);
      onChange && onChange(value);
    },
    [onChange]
  );

  return (
    <input
      style={{
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "dotted 1px gray",
        backgroundColor: "transparent",
        color: "white",
        outline: "none",
        width: "100%",
        lineHeight: 1.8,
        paddingLeft: 3,
        fontSize: "0.8rem",
      }}
      type="text"
      ref={inputRef}
      value={value}
      onChange={handleChange}
    ></input>
  );
};

export default PasteBinEditorApp;
