import { createSelector } from "reselect";

import createScope from "./createScope";
import sleep from "../../utils/sleep";

// Some useful variables

export const TICKET_TYPE = "TICKET";
export const INSURANCE_TYPE = "INSURANCE";
export const VOUCHER_TYPE = "VOUCHER";
export const DONATION_TYPE = "DONATION";
export const CARD_TYPE = "CARD";

// Selectors

const scope = createScope((state) => state.order);

export const selectOrderItems = scope((order) => order.items);

export const selectTickets = scope(
  createSelector(
    (order) => order.items,
    (items) => items.filter((item) => item.type === TICKET_TYPE)
  )
);

export const selectItemsWithoutVoucher = scope(
  createSelector(
    (order) => order.items,
    (items) => items.filter((item) => item.type !== VOUCHER_TYPE)
  )
);

export const selectItemsWithoutDonation = scope(
  createSelector(
    (order) => order.items,
    (items) => items.filter((item) => item.type !== DONATION_TYPE)
  )
);

export const selectItemsWithoutInsurance = scope(
  createSelector(
    (order) => order.items,
    (items) => items.filter((item) => item.type !== INSURANCE_TYPE)
  )
);

export const selectVoucher = scope(
  createSelector(
    (order) => order.items,
    (items) => items.find((item) => item.type === VOUCHER_TYPE) || null
  )
);

export const selectDonation = scope(
  createSelector(
    (order) => order.items,
    (items) => items.find((item) => item.type === DONATION_TYPE) || null
  )
);

const ZERO_EURO = Object.freeze({
  value: 0,
  currency: "EUR",
});

export const selectTotalAmount = scope(
  createSelector(
    (order) => order.items,
    (items) => {
      if (items.length === 0) {
        return ZERO_EURO;
      }

      const value = items.reduce((totalValue, item) => totalValue + item.price.value, 0);
      const currency = items[0].price.currency;

      return {
        value,
        currency,
      };
    }
  )
);

// Actions

const LOAD_ITEMS = "ORDER/LOAD_ITEMS";

const ADD_VOUCHER = "ORDER/VOUCHER/ADD";
const CANCEL_VOUCHER = "ORDER/VOUCHER/CANCEL";

const ADD_DONATION = "ORDER/DONATION/ADD";
const CANCEL_DONATION = "ORDER/DONATION/CANCEL";

const ADD_INSURANCE = "ORDER/INSURANCE/ADD";
const CANCEL_INSURANCE = "ORDER/INSURANCE/CANCEL";

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
    payload: Promise.resolve(),
  };
}

export function addInsurance(price) {
  const addInsuranceOnServer = async () => {
    await sleep(1500);

    return {
      price,
    };
  };
  return {
    type: ADD_INSURANCE,
    payload: addInsuranceOnServer(),
  };
}

export function cancelInsurance() {
  return {
    type: CANCEL_INSURANCE,
    payload: Promise.resolve(),
  };
}

export function addDonation(code) {
  const donateOnServer = async () => {
    await sleep(1500);

    return {
      code,
    };
  };

  return {
    type: ADD_DONATION,
    payload: donateOnServer(),
  };
}

export function cancelDonation() {
  const cancelDonationOnServer = async () => {
    await sleep(1500);
  };

  return {
    type: CANCEL_DONATION,
    payload: cancelDonationOnServer(),
  };
}

// Reducer

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case `${LOAD_ITEMS}_FULFILLED`: {
      return {
        ...state,
        items: payload.items,
      };
    }

    case `${ADD_VOUCHER}_FULFILLED`: {
      const { code } = payload;

      const tickets = selectTickets.withinScope(state);

      if (tickets.length === 0) {
        return state;
      }

      const ticketPrice = {
        value: tickets.map((ticket) => ticket.price.value).reduce((left, right) => left + right, 0),
        currency: tickets[0].price.currency,
      };

      const voucherItem = computeVoucher(ticketPrice, code);

      return {
        ...state,
        items: [...selectItemsWithoutVoucher.withinScope(state), voucherItem],
      };
    }

    case `${CANCEL_VOUCHER}_FULFILLED`: {
      return {
        ...state,
        items: selectItemsWithoutVoucher.withinScope(state),
      };
    }

    case `${ADD_DONATION}_FULFILLED`: {
      const { code } = payload;

      const itemsWithNoDonation = selectItemsWithoutDonation.withinScope(state);

      const association = "Médecins sans frontières";
      const donationItem = {
        id: `donation-${code}`,
        type: DONATION_TYPE,
        label: `Votre don pour ${association}`,
        price: {
          value: 1,
          currency: "EUR",
        },
        code,
        association,
      };

      return {
        ...state,
        items: [...itemsWithNoDonation, donationItem],
      };
    }

    case `${CANCEL_DONATION}_FULFILLED`: {
      return {
        ...state,
        items: selectItemsWithoutDonation.withinScope(state),
      };
    }

    case `${ADD_INSURANCE}_FULFILLED`: {
      const { price } = payload;

      const itemsWithoutInsurance = selectItemsWithoutInsurance.withinScope(state);

      const insuranceItem = {
        id: "insurance",
        type: INSURANCE_TYPE,
        label: "Vos assurances",
        price,
      };

      return {
        ...state,
        items: [...itemsWithoutInsurance, insuranceItem],
      };
    }

    case `${CANCEL_INSURANCE}_FULFILLED`: {
      return {
        ...state,
        items: selectItemsWithoutInsurance.withinScope(state),
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
    code,
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
          currency,
        },
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
          currency,
        },
      };
    }

    default: {
      const voucherAmount = 10;

      return {
        ...baseVoucherItem,
        voucherType: "AMOUNT",
        voucherAmount: {
          value: voucherAmount,
          currency,
        },
        price: {
          value: -voucherAmount,
          currency,
        },
      };
    }
  }
}
