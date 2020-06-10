import { MyWebSnippetsModalMap } from "../my-web.types";
import { MyWebSnippetsModal } from "../components/form/modal";
import { getDomain } from "./getDomain";

export const createDomainSnippetsMap = (
  all: MyWebSnippetsModal[]
): MyWebSnippetsModalMap => {
  return all.reduce(
    (
      mapData: MyWebSnippetsModalMap,
      doc: MyWebSnippetsModal
    ): MyWebSnippetsModalMap => {
      const domain = getDomain(doc.test);

      const data: MyWebSnippetsModal[] = mapData[domain] || [];
      data.push(doc);
      mapData[domain] = data;
      return mapData;
    },
    {}
  );
};
