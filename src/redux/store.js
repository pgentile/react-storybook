import createStore from "./createStore";
import payment from "./reducers/payment";
import loader, { loaderMiddleware } from "./reducers/loader";
import navigatorStatus, { navigatorStatusMiddleware } from "./reducers/navigatorStatus";

// Export a created store

export function createDefaultStore() {
  const reducers = {
    payment,
    loader,
    navigatorStatus
  };

  return createStore(reducers, {
    extraMiddlewares: [loaderMiddleware(), navigatorStatusMiddleware()]
  });
}

export default createDefaultStore();
