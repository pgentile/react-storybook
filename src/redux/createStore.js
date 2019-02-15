import { createStore as createReduxStore, applyMiddleware, compose, combineReducers } from "redux";
import promise from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";
import freezeMiddleware from "redux-freeze";

const middlewares = [thunkMiddleware, promise];

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  // Freeze middleware to detect bad updates
  if (process.env.NODE_ENV !== "test") {
    // eslint-disable-next-line no-console
    console.info("%c ❄️ Using the freeze middleware. Bad mutable store updates will be detected!", "font-weight: bold");
  }
  middlewares.push(freezeMiddleware);

  // Connect to Redux console
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export default function createStore(reducers, options = {}) {
  const realOptions = {
    initialState: {},
    extraMiddlewares: [],
    ...options
  };

  const enhancer = composeEnhancers(applyMiddleware(...middlewares, ...realOptions.extraMiddlewares));

  return createReduxStore(
    combineReducers({
      ...reducers
    }),
    realOptions.initialState,
    enhancer
  );
}
