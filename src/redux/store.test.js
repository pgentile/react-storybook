import * as payment from './reducers/payment';
import { createStore, middlewares } from './store';
import captureStoreActions from './captureStoreActions';


describe('Actions', () => {

  test('Load items', async () => {
    const storeActionsMiddleware = captureStoreActions();
    const store = createStore(undefined, [...middlewares, storeActionsMiddleware]);

    const items = [
      {
        id: 'id',
        name: 'This is an item',
      },
    ];

    await store.dispatch(payment.loadItems(items));

    const state = store.getState();
    expect(state.payment.items).toEqual(items);
  });

});
