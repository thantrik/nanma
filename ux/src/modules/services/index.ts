import { getRegisteredServices } from "../../app/app.services";
// import { IPluginService } from "../app/app.types";

for (const service of getRegisteredServices()) {
  try {
    service.start();
  } catch (e) {
    console.error(e);
  }
}
