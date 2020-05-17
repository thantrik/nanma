import "./app.styles.css";

export { getRoutes, RegisterRoute } from "../routes";
export { getState, history, store } from "../store";
export { Register, getPlugins } from "./register-plugin";
export { getAppReducer } from "./app.reducer";
export { default as context, AppContext } from "./context";
export { default as initAppView } from "./view";
