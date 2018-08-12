const LOAD_ITEMS = 'PAYMENT/LOAD_ITEMS';
const ADD_VOUCHER = 'PAYMENT/ADD_VOUCHER';
const CANCEL_VOUCHER = 'PAYMENT/CANCEL_VOUCHER';


export function loadItems(items) {
  return {
    type: LOAD_ITEMS,
    payload: {
      items,
    },
  };
}


export function addVoucher(code) {
  return {
    type: ADD_VOUCHER,
    payload: {
      code,
    },
  };
}


export function cancelVoucher() {
  return {
    type: CANCEL_VOUCHER,
    payload: {},
  };
}


const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

  case LOAD_ITEMS:
    return {
      ...state,
      items: payload.items,
    };

  case ADD_VOUCHER: {
    const itemsWithNoVoucher = state.items.filter(item => item.type !== 'VOUCHER');

    const voucherItem = {
      id: `voucher-${payload.code}`,
      type: 'VOUCHER',
      label: `Votre code promo ${payload.code}`,
      price: {
        value: -10,
        currency: '€',
      },
    };

    return {
      ...state,
      items: [
        ...itemsWithNoVoucher,
        voucherItem,
      ],
    };
  }

  case CANCEL_VOUCHER: {
    return {
      ...state,
      items: state.items.filter(item => item.type !== 'VOUCHER'),
    };
  }

  default:
    return state;

  }
};
