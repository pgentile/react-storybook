import { ActionType } from "redux-promise-middleware";

// Selectors

export const selectIsLoading = (state) => state.loader.loading;

// Actions

const CHANGE_STATE = "LOADER/CHANGE_STATE";

function changeState(loading) {
  return {
    type: CHANGE_STATE,
    payload: {
      loading,
    },
  };
}

// Reducer

const initialState = {
  loading: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  if (type === CHANGE_STATE) {
    return payload;
  }

  return state;
};

// Middleware

export function loaderMiddleware(unloadExpirationDelay = 100) {
  let loadingCounter = 0;

  return () => (next) => (action) => {
    const result = next(action);
    const { type, meta } = action;

    // Don't update the loader if the promise asked to ignore the loader
    if (meta && meta.loader && meta.loader.ignore) {
      return result;
    }

    if (type.endsWith(ActionType.Pending)) {
      if (loadingCounter === 0) {
        next(changeState(true));
      }

      loadingCounter++;
    } else if (type.endsWith(ActionType.Fulfilled) || type.endsWith(ActionType.Rejected)) {
      // Unload actions will be delayed.
      // This is useful for better loading indicator management.
      setTimeout(() => {
        loadingCounter--;

        if (loadingCounter === 0) {
          next(changeState(false));
        }
      }, unloadExpirationDelay);
    }

    return result;
  };
}
