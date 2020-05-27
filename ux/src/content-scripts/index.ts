import { getHooks } from "../app/register-plugin";
import context from "../app/context";

export const initialize = () => {
  const hooks = getHooks();
  if (hooks && hooks.length) {
    if (!context.DOMAccess) {
      hooks.forEach((hook) => {
        try {
          hook(context);
        } catch (e) {
          console.error(e);
        }
      });
    }
  }
};

initialize();
