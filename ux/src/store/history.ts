import { createMemoryHistory, createBrowserHistory } from "history";

export const history = createMemoryHistory({
  initialEntries: ["/"],
  initialIndex: 1,
});
