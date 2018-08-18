import payment, {
  VOUCHER_TYPE,
  DONATION_TYPE,
  selectPaymentItems,
  selectPaymentItemsWithoutVoucher,
  selectPaymentItemsWithoutDonation,
  selectVoucher,
  selectDonation,
  loadItems,
  addVoucher,
  cancelVoucher,
  addDonation,
  cancelDonation
} from "./payment";

import createStore from "../createStore";
import captureStoreActions from "../testutils/captureStoreActions";

let storeActionsMiddleware;
let store;

beforeEach(() => {
  storeActionsMiddleware = captureStoreActions();

  store = createStore(
    {
      payment
    },
    {
      extraMiddlewares: [storeActionsMiddleware]
    }
  );
});

describe("Selectors", () => {
  test("Select items", async () => {
    const items = [createItem(), createItem(), createItem()];

    await store.dispatch(loadItems(items));
    const selectedItems = selectPaymentItems(store.getState());

    expect(selectedItems).toEqual(items);
  });

  test("Select items without voucher", async () => {
    const items = [createItem(), createItem({ type: VOUCHER_TYPE }), createItem({ type: DONATION_TYPE }), createItem()];

    await store.dispatch(loadItems(items));

    const selectedItems = selectPaymentItemsWithoutVoucher(store.getState());

    expect(selectedItems).toHaveLength(3);
  });

  test("Select items without donation", async () => {
    const items = [createItem(), createItem({ type: VOUCHER_TYPE }), createItem({ type: DONATION_TYPE }), createItem()];

    await store.dispatch(loadItems(items));

    const selectedItems = selectPaymentItemsWithoutDonation(store.getState());

    expect(selectedItems).toHaveLength(3);
  });

  test("Select voucher", async () => {
    const items = [createItem(), createItem({ type: VOUCHER_TYPE }), createItem()];

    await store.dispatch(loadItems(items));

    const item = selectVoucher(store.getState());

    expect(item).not.toBeNull();
  });

  test("Select unexisting voucher", async () => {
    const items = [createItem(), createItem()];

    await store.dispatch(loadItems(items));

    const item = selectVoucher(store.getState());

    expect(item).toBeNull();
  });

  test("Select donation", async () => {
    const items = [createItem(), createItem({ type: DONATION_TYPE }), createItem()];

    await store.dispatch(loadItems(items));

    const item = selectDonation(store.getState());

    expect(item).not.toBeNull();
  });

  test("Select unexisting donation", async () => {
    const items = [createItem(), createItem()];

    await store.dispatch(loadItems(items));

    const item = selectDonation(store.getState());

    expect(item).toBeNull();
  });
});

describe("Actions", () => {
  test("Load items", async () => {
    const items = [createItem(), createItem(), createItem()];

    await store.dispatch(loadItems(items));

    const actions = storeActionsMiddleware.drainActions();
    expect(actions).toHaveLength(2);

    expect(actions[0]).toHaveProperty("type", "PAYMENT/LOAD_ITEMS_PENDING");

    expect(actions[1]).toHaveProperty("type", "PAYMENT/LOAD_ITEMS_FULFILLED");
    expect(actions[1]).toHaveProperty("payload.items", items);
  });

  test("Add voucher", async () => {
    const code = "RADIN";
    await store.dispatch(addVoucher(code));

    const actions = storeActionsMiddleware.drainActions();
    expect(actions).toHaveLength(2);

    expect(actions[0]).toHaveProperty("type", "PAYMENT/VOUCHER/ADD_PENDING");

    expect(actions[1]).toHaveProperty("type", "PAYMENT/VOUCHER/ADD_FULFILLED");
    expect(actions[1]).toHaveProperty("payload.code", code);
  });

  test("Adding a second voucher should replace first voucher", async () => {
    const code = "RADIN";
    const code2 = "SECOND";

    await store.dispatch(addVoucher(code));
    await store.dispatch(addVoucher(code2));

    const voucherItem = selectVoucher(store.getState());

    expect(voucherItem).toHaveProperty("code", code2);
  });

  test("Cancel voucher", async () => {
    const code = "RADIN";

    const stateBeforeActions = store.getState();

    await store.dispatch(addVoucher(code));
    await store.dispatch(cancelVoucher(code));

    const voucherItem = selectVoucher(store.getState());

    expect(voucherItem).toBeNull();
    expect(store.getState()).toEqual(stateBeforeActions);
  });

  test("Add donation", async () => {
    const code = "MSF";
    await store.dispatch(addDonation(code));

    const actions = storeActionsMiddleware.drainActions();
    expect(actions).toHaveLength(2);

    expect(actions[0]).toHaveProperty("type", "PAYMENT/DONATION/ADD_PENDING");

    expect(actions[1]).toHaveProperty("type", "PAYMENT/DONATION/ADD_FULFILLED");
    expect(actions[1]).toHaveProperty("payload.code", code);
  });

  test("Adding a second donation should replace first donation", async () => {
    const code = "MSF";
    const code2 = "SURF_RIDER";

    await store.dispatch(addDonation(code));
    await store.dispatch(addDonation(code2));

    const item = selectDonation(store.getState());

    expect(item).toHaveProperty("code", code2);
  });

  test("Cancel donation", async () => {
    const code = "MSF";

    const stateBeforeActions = store.getState();

    await store.dispatch(addDonation(code));
    await store.dispatch(cancelDonation(code));

    const item = selectDonation(store.getState());

    expect(item).toBeNull();
    expect(store.getState()).toEqual(stateBeforeActions);
  });
});

function createItem({ id, name, ...extraProps } = {}) {
  return {
    id: id || "id",
    name: name || "This is an item",
    ...extraProps
  };
}
