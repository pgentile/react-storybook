import * as payment from './payment';
import { createStore, middlewares } from '../store';
import captureStoreActions from '../captureStoreActions';


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

    const actions = storeActionsMiddleware.getActions();
    expect(actions).toHaveLength(1);

    expect(actions[0]).toHaveProperty('type', 'PAYMENT/LOAD_ITEMS');
    expect(actions[0]).toHaveProperty('payload.items', items);
  });

});
