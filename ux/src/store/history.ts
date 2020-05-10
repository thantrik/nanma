import { createMemoryHistory, createBrowserHistory } from "history";

export const history = createMemoryHistory({
  initialEntries: [window.location.pathname],
  initialIndex: 1,
});
