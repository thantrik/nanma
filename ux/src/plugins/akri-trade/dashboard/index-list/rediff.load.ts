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
      * {padding: 0; margin: 0; box-sizing: border-box; color: #9a9a9a;}
      div{ padding: 20px;}
      a { border: solid 1px transparent; margin-left: 8px; margin-top: 8px; display: inline-block; background-color: #232323; text-decoration:none; color: black; padding: 5px; border-radius:4px; }
      a:hover {
        background-color: #343434;
        border: solid 1px #686868;
     }
      a .f12 { color:mediumslateblue; }
      a .black { color: white}
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
