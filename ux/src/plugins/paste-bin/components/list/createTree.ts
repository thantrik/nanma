import { Document, DocumentId, DocumentType } from "../../paste-bin.types";

import IconDocument from "../../../../assets/document_48px.png";
import IconFavorite from "../../../../assets/star_filled_48px.png";
import IconFile from "../../../../assets/document_48px.png";
import IconFolder from "../../../../assets/folder_48.png";
import IconOpenFolder from "../../../../assets/opened_folder_48.png";
import IconRecycle from "../../../../assets/recycle_bin_48px.png";
import IconSettings from "../../../../assets/gears_48px.png";

interface TreeNodeType {
  icon: string;
  label: string;
  expanded: boolean;
  items: TreeNodeType[];
}
const createTreeNode = (
  document: Document,
  expanded?: boolean
): TreeNodeType => {
  return {
    icon: document.link.type === DocumentType.file ? IconFile : IconFolder,
    label: document.meta.title,
    expanded: !!expanded,
    items: [] as TreeNodeType[],
  };
};

type DocumentMap = Map<DocumentId, Document>;

const isChildNode = (doc: Document, docs: DocumentMap) => {
  if (!docs) return false;
  for (let parent of docs) {
    if (parent[1].link.children.indexOf(doc.id) !== -1) {
      return true;
    }
  }
  return false;
};

export const createTreeSource = (documents?: DocumentMap) => {
  const root = {
    icon: IconFolder,
    label: "Documents",
    expanded: true,
    items: [] as TreeNodeType[],
  };
  if (!documents || !documents.size) return [root];

  let documentList = documents.values();

  for (let document of documentList) {
    var treeNode = createTreeNode(document, false);
    if (!isChildNode(document, documents)) {
      root.items.push(treeNode);
    }
    if (document.link.children.length) {
      for (let childId of document.link.children) {
        let child = documents.get(childId);
        if (child) {
          treeNode.items.push(createTreeNode(child));
        }
      }
    }
  }

  return [root];

  //   var source = [
  //     {
  //       icon: IconFolder,
  //       label: "Mail",
  //       expanded: false,
  //       items: [
  //         { icon: Document, label: "Calendar" },
  //         {
  //           icon: Document,
  //           label: "Contacts",
  //           selected: false,
  //         },
  //       ],
  //     },
  //     {
  //       icon: IconOpenFolder,
  //       label: "Inbox",
  //       expanded: true,
  //       items: [
  //         { icon: IconFile, label: "Admin", selected: true },
  //         { icon: IconFile, label: "Corporate" },
  //         { icon: IconFile, label: "Finance" },
  //         { icon: IconFile, label: "Other" },
  //       ],
  //     },
  //     { icon: IconRecycle, label: "Deleted Items" },
  //     { icon: IconDocument, label: "Notes" },
  //     { iconsize: 14, icon: IconSettings, label: "Settings" },
  //     { icon: IconFavorite, label: "Favorites" },
  //   ];
  //   return source;
};
