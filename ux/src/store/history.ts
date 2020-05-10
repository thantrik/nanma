import { createMemoryHistory, createBrowserHistory } from "history";

export const history = createMemoryHistory({
  initialEntries: ["/dashboard"],
  initialIndex: 1,
});
