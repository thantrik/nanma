import { getWebCrawlHtml } from "../../request/rediff";

export const CUSTOM_TAG_REDIFF = "show-rediff";
export const CRAWL_URL_REDIFF = "https://money.rediff.com/index.html";
let rediffData = "";

const fetchSectorIndex = async (ref: React.RefObject<HTMLDivElement>) => {
  if (!rediffData) {
    rediffData = await getRediffData();
  }
  defineCustomElement();
  if (ref.current) {
    ref.current.childNodes.forEach((node) => ref.current?.removeChild(node));
    ref.current.appendChild(document.createElement(CUSTOM_TAG_REDIFF));
  }
};

const defineCustomElement = () => {
  if (!customElements.get(CUSTOM_TAG_REDIFF)) {
    customElements.define(
      CUSTOM_TAG_REDIFF,
      class extends HTMLElement {
        connectedCallback() {
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = rediffData;
        }
      }
    );
  }
};

const getRediffData = async (): Promise<string> => {
  const rediff = await getWebCrawlHtml(CRAWL_URL_REDIFF);
  if (rediff.ok && !rediff.error) {
    const cheerio = await import("cheerio");
    const selector = cheerio.load(rediff.html);
    return (
      `<style type="text/css" >
      * {padding: 0; margin: 0; box-sizing: border-box; color: white}
      div{ padding: 20px;}
      a { margin-left: 8px; margin-top: 8px; display: inline-block; background-color: white; text-decoration:none; color: black; padding: 5px; border-radius:4px; }
      a:hover { background-color: burlywood}
      a .f12 { color:blue }
      a .black { color: black}
      a .red { color: red}
      a .green { color: green}
     </style><br/><br/><div><h2>SECTOR INDEX</h2>` +
      (selector(
        "body div.wrapper div.leftcontainer div.div_secto_tabs"
      ).html() || "") +
      "</div>"
    );
    // setRediffData(
    //   // @ts-ignore
    //   selector("body").html(selector("div.leftcontainer").html() || "") ||
    //     ""
    // );

    //selector("body").html(selector("div.leftcontainer").html() || "");
  }
  return "";
};

export default fetchSectorIndex;
