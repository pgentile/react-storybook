import createStore from "./createStore";
import order from "./reducers/order";
import payment from "./reducers/payment";
import connectedUser from "./reducers/connectedUser";
import modals from "./reducers/modals";
import loader, { loaderMiddleware } from "./reducers/loader";
import navigatorStatus, { navigatorStatusMiddleware } from "./reducers/navigatorStatus";

// Export a created store

export function createDefaultStore() {
  const reducers = {
    loader,
    order,
    payment,
    connectedUser,
    modals,
    navigatorStatus,
  };

  return createStore(reducers, {
    extraMiddlewares: [loaderMiddleware(), navigatorStatusMiddleware()],
  });
}

export default createDefaultStore();
