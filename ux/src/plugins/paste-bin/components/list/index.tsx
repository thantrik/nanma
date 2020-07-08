import * as React from "react";

import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";

import Folder from "../assets/folder.png";

import JqxTree, {
  ITreeProps,
} from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtree";

class DocumentList extends React.PureComponent<{}, ITreeProps> {
  constructor(props: {}) {
    super(props);

    this.state = {
      width: "100%",
    };
  }

  render() {
    var source = [
      {
        icon: "../../images/mailIcon.png",
        label: "Mail",
        expanded: true,
        items: [
          { icon: "../../images/calendarIcon.png", label: "Calendar" },
          {
            icon: "../../images/contactsIcon.png",
            label: "Contacts",
            selected: true,
          },
        ],
      },
      {
        icon: Folder,
        label: "Inbox",
        expanded: true,
        items: [
          { icon: Folder, label: "Admin" },
          { icon: Folder, label: "Corporate" },
          { icon: Folder, label: "Finance" },
          { icon: Folder, label: "Other" },
        ],
      },
      { icon: "../../images/recycle.png", label: "Deleted Items" },
      { icon: "../../images/notesIcon.png", label: "Notes" },
      { iconsize: 14, icon: "../../images/settings.png", label: "Settings" },
      { icon: "../../images/favorites.png", label: "Favorites" },
    ];

    return (
      <JqxTree
        width={this.state.width}
        height={"100%"}
        {...this.props}
        source={source}
      />
    );
  }
}

export { DocumentList };
