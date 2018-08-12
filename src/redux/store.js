import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import freezeMiddleware from 'redux-freeze';

import reducer from './reducer';


export const middlewares = [
  thunkMiddleware,
  promiseMiddleware(),
];

let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') { // eslint-disable-line no-undef
  // Freeze middleware to detect bad updates
  // eslint-disable-next-line no-console
  console.info('%c ❄️ Using the freeze middleware. Bad mutable store updates will be detected!', 'font-weight: bold');
  middlewares.push(freezeMiddleware);

  // Connect to Redux console
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const defaultInitialState = {};
const defaultMiddlewares = middlewares;

export function createStore(initialState = defaultInitialState, middlewares = defaultMiddlewares) {
  return createReduxStore(reducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));
}

// Export a created store
export default createStore();
