import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import freezeMiddleware from 'redux-freeze';


const middlewares = [
  thunkMiddleware,
  promiseMiddleware(),
];


let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') { // eslint-disable-line no-undef
  // Freeze middleware to detect bad updates
  if (process.env.NODE_ENV !== 'test') { // eslint-disable-line no-undef
    // eslint-disable-next-line no-console
    console.info('%c ❄️ Using the freeze middleware. Bad mutable store updates will be detected!', 'font-weight: bold');
  }
  middlewares.push(freezeMiddleware);

  // Connect to Redux console
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}


export default function createStore(reducer, options = {}) {
  const realOptions = {
    initialState: {},
    extraMiddlewares: [],
    ...options,
  };

  const enhancer = composeEnhancers(applyMiddleware(
    ...middlewares,
    ...realOptions.extraMiddlewares
  ));

  return createReduxStore(
    reducer,
    realOptions.initialState,
    enhancer
  );
}

