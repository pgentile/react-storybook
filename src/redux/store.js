import createStore from './createStore';
import payment from './reducers/payment';
import loader, { middleware as loaderMiddleware } from './reducers/loader';


// Export a created store

const reducers = {
  payment,
  loader,
};

export default createStore(reducers, {
  extraMiddlewares: [loaderMiddleware],
});
