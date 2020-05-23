import { IPluginConfig } from "./app.types";
import initAppView from "./view";
let context: AppContext;

export class AppContext {
  isChromeExtension = /^chrome-extension:\/\//i.test(window.location.href);
  isLocalHost = /^http:\/\/localhost/i.test(window.location.href);
  isGithub = /thantrik\.github\.io/i.test(window.location.href);
  private __semCurrentDOM: IPluginConfig | undefined;
  get DOMAccess(): IPluginConfig | undefined {
    return this.__semCurrentDOM;
  }
  set DOMAccess(owner: IPluginConfig | undefined) {
    this.__semCurrentDOM = owner;
  }
  public isAnyOf3() {
    return this.isChromeExtension || this.isLocalHost || this.isGithub;
  }
  public async setDOMOwner(config: IPluginConfig) {
    this.__semCurrentDOM = config;
    await initAppView(config);
  }

  private constructor() {
    this.__semCurrentDOM = undefined;
  }
  static getInstance() {
    if (!context) {
      context = new AppContext();
    }
    return context;
  }
}

context = AppContext.getInstance();
export default context;
