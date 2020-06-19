import { IPluginConfig } from "./app.types";
import context from "./context";
export { getRoutes, RegisterRoute } from "../routes";
export { getState, history, store } from "../store";
export { Register, getPlugins } from "./register-plugin";
export { getAppReducer } from "./app.reducer";

export * from "../cache";
export { default as context, getCtx, AppContext } from "./context";

export const setDOMOwner = (config: IPluginConfig) => {
  context.setDOMOwner(config);
  (async () => {
    const viewModule = await import("./view");
    const initAppView = viewModule.default;
    initAppView && initAppView(config);
  })();
};
