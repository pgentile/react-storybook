import { createStore, applyMiddleware, combineReducers } from 'redux';

import payment, {
  VOUCHER_TYPE,
  selectPaymentItems,
  selectPaymentItemsWithoutVoucher,
  selectVoucher,
  loadItems,
  addVoucher,
  cancelVoucher
} from './payment';

import { middlewares } from '../store';
import captureStoreActions from '../testutils/captureStoreActions';


let storeActionsMiddleware;
let store;

beforeEach(() => {
  storeActionsMiddleware = captureStoreActions();

  const reducer = combineReducers({ payment });
  const enhancer = applyMiddleware(...middlewares, storeActionsMiddleware);
  store = createStore(reducer, {}, enhancer);
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

  test('Select items without voucher', async () => {
    const items = [
      createItem(),
      createItem({ type: VOUCHER_TYPE }),
      createItem(),
    ];

    await store.dispatch(loadItems(items));

    const selectedItems = selectPaymentItemsWithoutVoucher(store.getState());

    expect(selectedItems).toHaveLength(2);
  });

  test('Select voucher', async () => {
    const items = [
      createItem(),
      createItem({ type: VOUCHER_TYPE }),
      createItem(),
    ];

    await store.dispatch(loadItems(items));

    const voucherItem = selectVoucher(store.getState());

    expect(voucherItem).not.toBeNull();
  });

  test('Select unexisting voucher', async () => {
    const items = [
      createItem(),
      createItem(),
    ];

    await store.dispatch(loadItems(items));

    const voucherItem = selectVoucher(store.getState());

    expect(voucherItem).toBeNull();
  });

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

  test('Adding a second voucher should replace first voucher', async () => {
    const code = 'RADIN';
    const code2 = 'SECOND';

    await store.dispatch(addVoucher(code));
    await store.dispatch(addVoucher(code2));

    const voucherItem = selectVoucher(store.getState());

    expect(voucherItem).toHaveProperty('code', code2);
  });

  test('Cancel voucher', async () => {
    const code = 'RADIN';

    await store.dispatch(addVoucher(code));
    await store.dispatch(cancelVoucher(code));

    const voucherItem = selectVoucher(store.getState());

    expect(voucherItem).toBeNull();
  });

});


function createItem({ id, name, ...extraProps } = {}) {
  return {
    id: id || 'id',
    name: name || 'This is an item',
    ...extraProps,
  };
}
