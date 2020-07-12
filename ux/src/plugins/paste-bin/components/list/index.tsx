import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";

import * as React from "react";

import { Document, DocumentId } from "../../paste-bin.types";
import { FontIcon, mergeStyles } from "@fluentui/react";
import JqxTree, {
  ITreeProps,
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";

import JqxMenu from "jqwidgets-scripts/jqwidgets-react-tsx/jqxmenu";
import { createTreeSource } from "./createTree";

interface IDocumentListProps {
  documents: Map<DocumentId, Document>;
}
class DocumentList extends React.PureComponent<IDocumentListProps, ITreeProps> {
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
  getSnapshotBeforeUpdate(props: IDocumentListProps) {
    const source = createTreeSource(props.documents);
    return {
      source,
    };
  }
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
          onItemclick={this.myMenuOnItemClick}
          width={120}
          autoOpenPopup={false}
          mode={"popup"}
          style={{
            fontSize: 9,
          }}
        >
          <ul>
            <li>New File</li>
            <li>Flag</li>
            <li>Tag</li>
            <li>Star</li>
            <li>New Folder</li>
            <li>Rename</li>
            <li>Remove</li>
          </ul>
        </JqxMenu>
      </>
    );
  }
  private myMenuOnItemClick = (event: any): void => {
    const item = event.args.innerText;
    let selectedItem = null;
    switch (item) {
      case "New File":
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case "New Folder":
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case "Rename":
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case "Flag":
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case "Tag":
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case "Star":
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case "Delete":
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.removeItem(selectedItem.element);
        }
        break;
    }
  };
}
export { DocumentList };
