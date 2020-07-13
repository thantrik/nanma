import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";

import * as React from "react";

import { Document, DocumentId } from "../../paste-bin.types";
import { FontIcon, mergeStyles } from "@fluentui/react";
import JqxTree, {
  ITreeProps,
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";
import { TreeNodeType, createTreeSource } from "./createTree";

import { DocumentAction } from "../../actions";
import JqxMenu from "jqwidgets-scripts/jqwidgets-react-tsx/jqxmenu";

interface IDocumentListProps extends ITreeProps {
  documents: Map<DocumentId, Document>;
  onAction: (action: DocumentAction) => Promise<Document>;
}
interface IDocumentListState {
  width: string;
  source: TreeNodeType[];
}
class DocumentList extends React.Component<
  IDocumentListProps,
  IDocumentListState
> {
  private myTree = React.createRef<JqxTree>();
  private myMenu = React.createRef<JqxMenu>();
  constructor(props: IDocumentListProps) {
    super(props);
    this.state = {
      width: "100%",
      source: createTreeSource(),
    };
  }
  public componentDidMount(): void {
    document.addEventListener("contextmenu", (event: any) => {
      event.preventDefault();
      if (event.target.classList.contains("jqx-tree-item")) {
        this.myTree.current!.selectItem(event.target.parentNode);
        const scrollTop = window.scrollY;
        const scrollLeft = window.scrollX;
        this.myMenu.current!.open(
          event.clientX + 5 + scrollLeft,
          event.clientY + 5 + scrollTop
        );
      } else {
        this.myMenu.current!.close();
      }
      return false;
    });
  }
  static getDerivedStateFromProps = (
    props: IDocumentListProps,
    state: IDocumentListState
  ): IDocumentListState => {
    let source: TreeNodeType[] = state.source;
    try {
      source = createTreeSource(props.documents);
      console.log("%c Source", "color: blue", source);
    } catch (err) {
      console.log("Create Source ", err);
    }

    return {
      ...state,
      source,
    };
  };
  public render() {
    const listIconStyles = mergeStyles({
      marginRight: 0,
      fontWeight: "bold",
      cursor: "pointer",
    });
    return (
      <>
        <div
          style={{
            zoom: 1.3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            minHeight: 30,
            padding: 5,
          }}
        >
          <FontIcon iconName="Delete" className={listIconStyles} />
          <FontIcon iconName="Subscribe" className={listIconStyles} />
          <FontIcon iconName="DownloadDocument" className={listIconStyles} />
          <FontIcon iconName="NewFolder" className={listIconStyles} />
          <FontIcon iconName="AddNotes" className={listIconStyles} />
        </div>
        <JqxTree
          ref={this.myTree}
          width={this.state.width}
          height={"100%"}
          source={this.state.source}
          {...this.props}
        ></JqxTree>
        <JqxMenu
          ref={this.myMenu}
          onItemclick={this.onMenuItemClick}
          width={120}
          autoOpenPopup={false}
          mode={"popup"}
          style={{
            fontSize: 9,
          }}
        >
          <ul>
            {Object.values(DocumentAction).map((v: string) => {
              let item = <li key={v}>{v}</li>;
              if (v.indexOf("New") > -1) {
                item = (
                  <li key={v}>
                    {v}
                    <ul>
                      <li>New File</li>
                      <li>New Folder</li>
                    </ul>
                  </li>
                );
              } else if (v.indexOf("Flag") > -1) {
                item = (
                  <li key={v}>
                    {v}
                    <ul>
                      <li>Star</li>
                      <li>Super</li>
                      <li>Butterfly</li>
                      <li>Bug</li>
                      <li>Task</li>
                      <li>File</li>
                      <li>Important</li>
                      <li>Pink</li>
                    </ul>
                  </li>
                );
              }
              return item;
            })}
          </ul>
        </JqxMenu>
      </>
    );
  }
  private onMenuItemClick = async (event: any) => {
    const item = event.args.innerText;
    const { onAction } = this.props;
    let selectedItem = null;
    switch (item) {
      case DocumentAction.NewFile:
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case DocumentAction.NewFolder:
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case DocumentAction.Edit:
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case DocumentAction.flag:
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case DocumentAction.tag:
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case DocumentAction.delete:
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.removeItem(selectedItem.element);
        }
        break;
      case DocumentAction.export:
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.removeItem(selectedItem.element);
        }
        break;
      case DocumentAction.import:
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.removeItem(selectedItem.element);
        }
        break;
      case DocumentAction.download:
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.removeItem(selectedItem.element);
        }
        break;
    }
    await onAction(item);
  };
}
export { DocumentList };
