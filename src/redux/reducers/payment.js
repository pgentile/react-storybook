import { FULFILLED } from "redux-promise-middleware";

import createScope from "./createScope";

// Some useful variables

export const TICKET_TYPE = "TICKET";
export const INSURANCE_TYPE = "INSURANCE";
export const VOUCHER_TYPE = "VOUCHER";
export const DONATION_TYPE = "DONATION";

// Selectors

const scope = createScope(state => state.payment);

export const selectPaymentItems = scope(payment => payment.items);

export const selectTickets = scope(payment => {
  return selectPaymentItems.withinScope(payment).filter(item => item.type === TICKET_TYPE);
});

export const selectPaymentItemsWithoutVoucher = scope(payment => {
  return selectPaymentItems.withinScope(payment).filter(item => item.type !== VOUCHER_TYPE);
});

export const selectPaymentItemsWithoutDonation = scope(payment => {
  return selectPaymentItems.withinScope(payment).filter(item => item.type !== DONATION_TYPE);
});

export const selectVoucher = scope(payment => {
  return selectPaymentItems.withinScope(payment).find(item => item.type === VOUCHER_TYPE) || null;
});

export const selectDonation = scope(payment => {
  return selectPaymentItems.withinScope(payment).find(item => item.type === DONATION_TYPE) || null;
});

// Actions

const LOAD_ITEMS = "PAYMENT/LOAD_ITEMS";

const ADD_VOUCHER = "PAYMENT/VOUCHER/ADD";
const CANCEL_VOUCHER = "PAYMENT/VOUCHER/CANCEL";

const ADD_DONATION = "PAYMENT/DONATION/ADD";
const CANCEL_DONATION = "PAYMENT/DONATION/CANCEL";

export function loadItems(items) {
  return {
    type: LOAD_ITEMS,
    payload: Promise.resolve({
      items
    })
  };
}

export function addVoucher(code) {
  return {
    type: ADD_VOUCHER,
    payload: Promise.resolve({
      code
    })
  };
}

export function cancelVoucher() {
  return {
    type: CANCEL_VOUCHER,
    payload: Promise.resolve()
  };
}

export function addDonation(code) {
  return {
    type: ADD_DONATION,
    payload: Promise.resolve({
      code
    })
  };
}

export function cancelDonation() {
  return {
    type: CANCEL_DONATION,
    payload: Promise.resolve()
  };
}

// Reducer

const initialState = {
  items: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case `${LOAD_ITEMS}_${FULFILLED}`: {
      return {
        ...state,
        items: payload.items
      };
    }

    case `${ADD_VOUCHER}_${FULFILLED}`: {
      const { code } = payload;

      const tickets = selectTickets.withinScope(state);

      if (tickets.length === 0) {
        return state;
      }

      const ticketPrice = {
        value: tickets.map(ticket => ticket.price.value).reduce((left, right) => left + right, 0),
        currency: tickets[0].price.currency
      };

      const voucherItem = computeVoucher(ticketPrice, code);

      return {
        ...state,
        items: [...selectPaymentItemsWithoutVoucher.withinScope(state), voucherItem]
      };
    }

    case `${CANCEL_VOUCHER}_${FULFILLED}`: {
      return {
        ...state,
        items: selectPaymentItemsWithoutVoucher.withinScope(state)
      };
    }

    case `${ADD_DONATION}_${FULFILLED}`: {
      const { code } = payload;

      const itemsWithNoDonation = selectPaymentItemsWithoutDonation.withinScope(state);

      const association = "Médecins sans frontières";
      const donationItem = {
        id: `donation-${code}`,
        type: DONATION_TYPE,
        label: `Votre don pour ${association}`,
        price: {
          value: 1,
          currency: "€"
        },
        code,
        association
      };

      return {
        ...state,
        items: [...itemsWithNoDonation, donationItem]
      };
    }

    case `${CANCEL_DONATION}_${FULFILLED}`: {
      return {
        ...state,
        items: selectPaymentItemsWithoutDonation.withinScope(state)
      };
    }

    default:
      return state;
  }
};

function computeVoucher(ticketPrice, code) {
  const { currency } = ticketPrice;

  const baseVoucherItem = {
    id: `voucher-${code}`,
    type: VOUCHER_TYPE,
    label: `Votre code promo ${code}`,
    code
  };

  switch (code) {
    case "PROMO10%": {
      const voucherPercentage = 10;

      return {
        ...baseVoucherItem,
        voucherType: "PERCENTAGE",
        voucherPercentage,
        price: {
          value: -ticketPrice.value * (voucherPercentage / 100),
          currency
        }
      };
    }

    case "PROMO25%": {
      const voucherPercentage = 25;

      return {
        ...baseVoucherItem,
        voucherType: "PERCENTAGE",
        voucherPercentage,
        price: {
          value: -ticketPrice.value * (voucherPercentage / 100),
          currency
        }
      };
    }

    default: {
      const voucherAmount = 10;

      return {
        ...baseVoucherItem,
        voucherType: "AMOUNT",
        voucherAmount: {
          value: voucherAmount,
          currency
        },
        price: {
          value: -voucherAmount,
          currency
        }
      };
    }
  }
}
