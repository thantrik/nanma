import { IPluginConfig } from "./app.types";
import "../global.d";

let context: AppContext;
const NANMA_EXTENSION_ID = "NANMA_EXTENSION_ID";

export class AppContext {
  isExtension = /^(chrome-extension|extension|firefox|opera):\/\//i.test(
    window.location.href
  );
  isLocalHost = /^http:\/\/localhost/i.test(window.location.href);
  isGithub = /thantrik\.github\.io/i.test(window.location.href);
  // @ts-ignore
  extensionId: string = window[NANMA_EXTENSION_ID] || chrome.runtime.id;
  private __semCurrentDOM: IPluginConfig | undefined;
  get DOMAccess(): IPluginConfig | undefined {
    return this.__semCurrentDOM;
  }
  set DOMAccess(owner: IPluginConfig | undefined) {
    this.__semCurrentDOM = owner;
  }
  public isAnyOf3() {
    return this.isExtension || this.isLocalHost || this.isGithub;
  }
  public setDOMOwner(config: IPluginConfig) {
    this.__semCurrentDOM = config;
  }

  private constructor() {
    this.__semCurrentDOM = undefined;
    // @ts-ignore
    this.extensionId = window[NANMA_EXTENSION_ID] || chrome.runtime.id;
    // @ts-ignore
    if (!window[NANMA_EXTENSION_ID]) {
      // @ts-ignore
      window[NANMA_EXTENSION_ID] = this.extensionId;
    }
  }
  public getId(): string {
    return this.extensionId;
  }
  static getInstance() {
    if (!context) {
      context = new AppContext();
    }
    return context;
  }
  public isHTML() {
    return (
      window?.document?.doctype?.name ||
      window?.document?.contentType ||
      ""
    )
      .toString()
      .toLowerCase()
      .includes("html");
  }
}
context = AppContext.getInstance();
export default context;

export const getCtx = () => AppContext.getInstance();
