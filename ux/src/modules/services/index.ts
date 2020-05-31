import { getRegisteredServices } from "../../app/app.services";
// import { IPluginService } from "../app/app.types";

for (const service of getRegisteredServices()) {
  try {
    console.log(`Service ${service.name} starting..`);
    service.start();
    console.log(`Service ${service.name} started..`);
  } catch (e) {
    console.log(`Service ${service.name} `, e);
  }
}
