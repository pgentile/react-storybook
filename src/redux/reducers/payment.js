import { FULFILLED } from 'redux-promise-middleware';

import createScope from './createScope';


// Actions

const LOAD_ITEMS = 'PAYMENT/LOAD_ITEMS';
const ADD_VOUCHER = 'PAYMENT/ADD_VOUCHER';
const CANCEL_VOUCHER = 'PAYMENT/CANCEL_VOUCHER';


export function loadItems(items) {
  return {
    type: LOAD_ITEMS,
    payload: Promise.resolve({
      items,
    }),
  };
}


export function addVoucher(code) {
  return {
    type: ADD_VOUCHER,
    payload: Promise.resolve({
      code,
    }),
  };
}


export function cancelVoucher() {
  return {
    type: CANCEL_VOUCHER,
    payload: Promise.resolve({

    }),
  };
}


// Selectors

const scope = createScope(state => state.payment);

export const selectPaymentItems = scope(payment => payment.items);


// Reducer

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {

  case `${LOAD_ITEMS}_${FULFILLED}`: {
    return {
      ...state,
      items: payload.items,
    };
  }

  case `${ADD_VOUCHER}_${FULFILLED}`: {
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

  case `${CANCEL_VOUCHER}_${FULFILLED}`: {
    return {
      ...state,
      items: state.items.filter(item => item.type !== 'VOUCHER'),
    };
  }

  default:
    return state;

  }
};
