import createStore from './createStore';
import payment from './reducers/payment';
import loader, { loaderMiddleware } from './reducers/loader';


// Export a created store

export function createDefaultStore() {
  const reducers = {
    payment,
    loader,
  };

  return createStore(reducers, {
    extraMiddlewares: [loaderMiddleware()],
  });
}

export default createDefaultStore();
