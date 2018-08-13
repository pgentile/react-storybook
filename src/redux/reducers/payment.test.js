import { loadItems, addVoucher, selectPaymentItems } from './payment';
import { createStore, middlewares } from '../store';
import captureStoreActions from '../captureStoreActions';


let storeActionsMiddleware;
let store;

beforeEach(() => {
  storeActionsMiddleware = captureStoreActions();
  store = createStore(undefined, [...middlewares, storeActionsMiddleware]);
});


describe('Actions', () => {

  test('Load items', async () => {
    const items = [
      createItem(),
      createItem(),
      createItem(),
    ];

    await store.dispatch(loadItems(items));

    const actions = storeActionsMiddleware.getActions();
    expect(actions).toHaveLength(2);

    expect(actions[0]).toHaveProperty('type', 'PAYMENT/LOAD_ITEMS_PENDING');

    expect(actions[1]).toHaveProperty('type', 'PAYMENT/LOAD_ITEMS_FULFILLED');
    expect(actions[1]).toHaveProperty('payload.items', items);
  });

  test('Add voucher', async () => {
    const code = 'RADIN';
    await store.dispatch(addVoucher(code));

    const actions = storeActionsMiddleware.getActions();
    expect(actions).toHaveLength(2);

    expect(actions[0]).toHaveProperty('type', 'PAYMENT/ADD_VOUCHER_PENDING');

    expect(actions[1]).toHaveProperty('type', 'PAYMENT/ADD_VOUCHER_FULFILLED');
    expect(actions[1]).toHaveProperty('payload.code', code);
  });

});


describe('Selectors', () => {

  test('Select items', async () => {
    const items = [
      createItem(),
      createItem(),
      createItem(),
    ];

    await store.dispatch(loadItems(items));
    const selectedItems = selectPaymentItems(store.getState());

    expect(selectedItems).toEqual(items);
  });

});


function createItem() {
  return {
    id: 'id',
    name: 'This is an item',
  };
}
