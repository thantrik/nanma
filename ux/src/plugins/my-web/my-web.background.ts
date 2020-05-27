import { MyWebSnippetsModal } from "./components/form/modal";
import { IPluginService } from "../../app/app.types";

const start = () => {
  console.log(MyWebSnippetsModal.getAll());
};

const stop = () => {};

const service: IPluginService = {
  start,
  stop,
};

export default service;
