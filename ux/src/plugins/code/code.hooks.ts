import { AppContext, setDOMOwner } from "../../app";
import config from "./code.config";
import { setCodeView } from "./code.actions";

declare global {
  interface Window {
    ___DATA: any;
  }
}

// const location = window.location;

const codeView = (url: string, data: string) => {
  setDOMOwner(config);
  window.___DATA = data;
  setCodeView({
    data,
    url,
  });
  return true;
};

const hook = (context: AppContext) => {
  if (
    context.isHTML() ||
    context.isExtension ||
    /\.(md|json)$/i.test(window.location.href) ||
    /json/.test(document.contentType)
  )
    return;
  const data = String(document.body.innerText).trim();

  if (!data) {
    return;
  }
  return codeView(window.location.href, data);
  // interface Language {
  //   regex: RegExp;
  //   mime: string;
  //   alias: string;
  // }
  // const listExtensions: Language[] = languages
  //   .getLanguages()
  //   .reduce((listLang: Language[], language) => {
  //     if (language?.extensions?.[0]) {
  //       listLang.push({
  //         regex: new RegExp(`.(${language?.extensions?.join("|")})$`, "ig"),
  //         mime: language.mimetypes?.[0] || "",
  //         alias: language.aliases?.[0] as string,
  //       });
  //     }
  //     return listLang;
  //   }, []);
  // console.log("list file Extensions", listExtensions);
  // listExtensions.some((value) => {
  //   if (value.regex.test(location.href)) {
  //     return codeView(value.alias, data);
  //   }
  //   return false;
  // });
};

export default hook;
