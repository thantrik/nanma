import { getWebCrawlHtml } from "../../request/rediff";

const fetchSectorIndex = async (ref: React.RefObject<HTMLDivElement>) => {
  const rediff = await getWebCrawlHtml("https://money.rediff.com/index.html");
  if (rediff.ok && !rediff.error) {
    const cheerio = await import("cheerio");
    const selector = cheerio.load(rediff.html);
    // setRediffData(
    //   // @ts-ignore
    //   selector("body").html(selector("div.leftcontainer").html() || "") ||
    //     ""
    // );

    //selector("body").html(selector("div.leftcontainer").html() || "");
    if (ref.current) {
      // !!customElements.get("show-rediff")
      customElements.define(
        "show-rediff",
        class extends HTMLElement {
          connectedCallback() {
            const shadow = this.attachShadow({ mode: "open" });
            shadow.innerHTML =
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
              "</div>";
          }
        }
      );
      ref.current.appendChild(document.createElement("show-rediff"));
    }
  }
};

export default fetchSectorIndex;
