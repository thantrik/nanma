import { createMemoryHistory, createBrowserHistory } from "history";

export const history =
  process?.env?.NODE_ENV !== "production"
    ? createBrowserHistory()
    : createMemoryHistory({
        initialEntries: ["/"],
        initialIndex: 1,
      });
