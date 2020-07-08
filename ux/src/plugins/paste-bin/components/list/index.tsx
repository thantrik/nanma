import * as React from "react";
import JqxMenu from "jqwidgets-scripts/jqwidgets-react-tsx/jqxmenu";

import JqxTree, {
  ITreeProps,
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";

import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";

import Folder from "../assets/folder_48.png";
import OpenFolder from "../assets/opened_folder_48.png";
import Favorite from "../assets/star_filled_48px.png";
import File from "../assets/document_48px.png";
import Recycle from "../assets/recycle_bin_48px.png";
import Document from "../assets/document_48px.png";
import Settings from "../assets/gears_48px.png";

class DocumentList extends React.PureComponent<{}, ITreeProps> {
  private myTree = React.createRef<JqxTree>();
  private myMenu = React.createRef<JqxMenu>();
  constructor(props: {}) {
    super(props);
    this.state = {
      width: "100%",
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
  public render() {
    var source = [
      {
        icon: Folder,
        label: "Mail",
        expanded: false,
        items: [
          { icon: Document, label: "Calendar" },
          {
            icon: Document,
            label: "Contacts",
            selected: false,
          },
        ],
      },
      {
        icon: OpenFolder,
        label: "Inbox",
        expanded: true,
        items: [
          { icon: File, label: "Admin", selected: true },
          { icon: File, label: "Corporate" },
          { icon: File, label: "Finance" },
          { icon: File, label: "Other" },
        ],
      },
      { icon: Recycle, label: "Deleted Items" },
      { icon: Document, label: "Notes" },
      { iconsize: 14, icon: Settings, label: "Settings" },
      { icon: Favorite, label: "Favorites" },
    ];

    return (
      <>
        <JqxTree
          ref={this.myTree}
          width={this.state.width}
          height={"100%"}
          source={source}
          {...this.props}
        ></JqxTree>
        <JqxMenu
          ref={this.myMenu}
          onItemclick={this.myMenuOnItemClick}
          width={120}
          height={56}
          autoOpenPopup={false}
          mode={"popup"}
        >
          <ul>
            <li>Add Item</li>
            <li>Remove Item</li>
          </ul>
        </JqxMenu>
      </>
    );
  }
  private myMenuOnItemClick = (event: any): void => {
    const item = event.args.innerText;
    let selectedItem = null;
    switch (item) {
      case "Add Item":
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.addTo({ label: "Item" }, selectedItem.element);
        }
        break;
      case "Remove Item":
        selectedItem = this.myTree.current!.getSelectedItem();
        if (selectedItem != null) {
          this.myTree.current!.removeItem(selectedItem.element);
        }
        break;
    }
  };
}
export { DocumentList };
