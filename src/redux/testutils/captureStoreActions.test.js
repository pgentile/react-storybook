import { createStore, applyMiddleware } from 'redux';

import captureStoreActions from './captureStoreActions';


test('Capture dispatched actions', () => {
  const storeActionsMiddleware = captureStoreActions();

  const reducer = state => state;
  const initialState = {};
  const store = createStore(reducer, initialState, applyMiddleware(storeActionsMiddleware));

  store.dispatch({ type: 'TEST1' });
  store.dispatch({ type: 'TEST2' });

  const actions = storeActionsMiddleware.drainActions();
  expect(actions).toHaveLength(2);

  const actionTypes = actions.map(action => action.type);
  expect(actionTypes).toEqual(['TEST1', 'TEST2']);

  // The first drainActions should clear captured actions
  const actionsAfterDrain = storeActionsMiddleware.drainActions();
  expect(actionsAfterDrain).toHaveLength(0);
});
