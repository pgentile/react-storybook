import loader, { loaderMiddleware, selectIsLoading } from "./loader";

import createStore from "../createStore";
import captureStoreActions from "../testutils/captureStoreActions";

jest.useFakeTimers();

let storeActionsMiddleware;
let store;

beforeEach(() => {
  storeActionsMiddleware = captureStoreActions();

  store = createStore(
    {
      loader
    },
    {
      extraMiddlewares: [loaderMiddleware(), storeActionsMiddleware]
    }
  );
});

test("Pending", () => {
  store.dispatch({
    type: "TEST",
    payload: new Promise(() => {
      // Never resolve
    })
  });

  const actions = storeActionsMiddleware.drainActions();
  const actionTypes = actions.map(action => action.type);

  expect(actionTypes).toEqual(["TEST_PENDING", "LOADER/CHANGE_STATE"]);

  const isLoading = selectIsLoading(store.getState());
  expect(isLoading).toBe(true);
});

test("Fullfilment", async () => {
  await store.dispatch({
    type: "TEST",
    payload: Promise.resolve()
  });

  const actions = storeActionsMiddleware.drainActions();
  const actionTypes = actions.map(action => action.type);

  expect(actionTypes).toEqual(["TEST_PENDING", "LOADER/CHANGE_STATE", "TEST_FULFILLED"]);

  const isLoading = selectIsLoading(store.getState());
  expect(isLoading).toBe(true);

  jest.runAllTimers();

  const updatedActions = storeActionsMiddleware.drainActions();
  const updatedActionTypes = updatedActions.map(action => action.type);

  expect(updatedActionTypes).toEqual(["LOADER/CHANGE_STATE"]);

  const isLoadingAfterUnload = selectIsLoading(store.getState());
  expect(isLoadingAfterUnload).toBe(false);
});

test("Rejection", async () => {
  const actionResult = store.dispatch({
    type: "TEST",
    payload: Promise.reject(new Error("Failure"))
  });

  await expect(actionResult).rejects.toThrow("Failure");

  const actions = storeActionsMiddleware.drainActions();
  const actionTypes = actions.map(action => action.type);
  expect(actionTypes).toEqual(["TEST_PENDING", "LOADER/CHANGE_STATE", "TEST_REJECTED"]);

  const isLoading = selectIsLoading(store.getState());
  expect(isLoading).toBe(true);

  jest.runAllTimers();

  const updatedActions = storeActionsMiddleware.drainActions();
  const updatedActionTypes = updatedActions.map(action => action.type);

  expect(updatedActionTypes).toEqual(["LOADER/CHANGE_STATE"]);

  const isLoadingAfterUnload = selectIsLoading(store.getState());
  expect(isLoadingAfterUnload).toBe(false);
});

test("Multiple resolutions", async () => {
  await store.dispatch({
    type: "TEST1",
    payload: Promise.resolve()
  });

  const actionResult2 = store.dispatch({
    type: "TEST2",
    payload: Promise.reject(new Error("Failure"))
  });

  await expect(actionResult2).rejects.toThrow("Failure");

  const actions = storeActionsMiddleware.drainActions();
  const types = actions.map(action => action.type);
  expect(types).toEqual(["TEST1_PENDING", "LOADER/CHANGE_STATE", "TEST1_FULFILLED", "TEST2_PENDING", "TEST2_REJECTED"]);

  const isLoading = selectIsLoading(store.getState());
  expect(isLoading).toBe(true);

  jest.runAllTimers();

  const updatedActions = storeActionsMiddleware.drainActions();
  const updatedTypes = updatedActions.map(action => action.type);
  expect(updatedTypes).toEqual(["LOADER/CHANGE_STATE"]);

  const isLoadingAfterUnload = selectIsLoading(store.getState());
  expect(isLoadingAfterUnload).toBe(false);
});

test("Ignore loader", async () => {
  await store.dispatch({
    type: "TEST",
    payload: Promise.resolve(),
    meta: {
      loader: {
        ignore: true
      }
    }
  });

  const actions = storeActionsMiddleware.drainActions();
  const actionTypes = actions.map(action => action.type);

  expect(actionTypes).toEqual(["TEST_PENDING", "TEST_FULFILLED"]);

  const isLoading = selectIsLoading(store.getState());
  expect(isLoading).toBe(false);

  jest.runAllTimers();

  const updatedActions = storeActionsMiddleware.drainActions();
  expect(updatedActions).toHaveLength(0);

  const isLoadingAfterUnload = selectIsLoading(store.getState());
  expect(isLoadingAfterUnload).toBe(false);
});
