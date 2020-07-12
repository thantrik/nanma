import { Document, DocumentId, DocumentType } from "../../paste-bin.types";

import { getIcon } from "./getIcon";

export interface TreeNodeType {
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
    icon: getIcon(document.type),
    label: document.meta.title,
    expanded: !!expanded,
    items: [] as TreeNodeType[],
  };
};

type DocumentMap = Map<DocumentId, Document>;

const isChildNode = (doc: Document, docs: DocumentMap) => {
  if (!docs) return false;
  for (let parent of docs) {
    if (parent[1].children.indexOf(doc.id) !== -1) {
      return true;
    }
  }
  return false;
};

export const createTreeSource = (documents?: DocumentMap): TreeNodeType[] => {
  const root = {
    icon: getIcon(DocumentType.folder),
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
    if (document.children.length) {
      for (let childId of document.children) {
        let child = documents.get(childId);
        if (child) {
          treeNode.items.push(createTreeNode(child));
        }
      }
    }
  }
  console.log([root]);
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
