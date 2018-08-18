import createScope from "./createScope";
import { handleAction } from "redux-actions";

// Selectors

const scope = createScope(state => state.navigatorStatus);

export const selectIsConnected = scope(state => state.connected);
export const selectIsDisconnected = scope(state => !state.connected);

// Actions

const PREFIX = "NAVIGATOR_STATUS";
const SET_STATUS = `${PREFIX}/SET_STATUS`;

function setStatus(connected) {
  return {
    type: SET_STATUS,
    payload: {
      connected
    }
  };
}

// Reducer

const initialState = {
  connected: true
};

export default handleAction(
  SET_STATUS,
  (state, action) => ({
    ...state,
    connected: action.payload.connected
  }),
  initialState
);

// Middleware

export function navigatorStatusMiddleware() {
  return store => {
    window.addEventListener("online", () => {
      store.dispatch(setStatus(true));
    });

    window.addEventListener("offline", () => {
      store.dispatch(setStatus(false));
    });

    return next => action => next(action);
  };
}

// Utils

export async function waitForOnline(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Wait for online failed")), timeout);

    const listener = () => resolve();

    window.addEventListener(listener);

    if (navigator.onLine) {
      resolve();
    }

    window.removeEventListener("online", listener);
  });
}
