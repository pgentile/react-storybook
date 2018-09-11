import createStore from "./createStore";
import order from "./reducers/order";
import payment from "./reducers/payment";
import loader, { loaderMiddleware } from "./reducers/loader";
import navigatorStatus, { navigatorStatusMiddleware } from "./reducers/navigatorStatus";
import connectedUser from "./reducers/connectedUser";

// Export a created store

export function createDefaultStore() {
  const reducers = {
    loader,
    order,
    payment,
    connectedUser,
    navigatorStatus
  };

  return createStore(reducers, {
    extraMiddlewares: [loaderMiddleware(), navigatorStatusMiddleware()]
  });
}

export default createDefaultStore();
