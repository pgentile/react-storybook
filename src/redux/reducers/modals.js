import { createSelector } from "reselect";

// Selectors

export const selectCurrentModal = createSelector(
  (state) => state.modals,
  (modals) => {
    let currentModal = null;

    Object.keys(modals).forEach((modalName) => {
      if (currentModal === null && modals[modalName]) {
        currentModal = modalName;
      }
    });

    return currentModal;
  }
);

// Actions

const SHOW_MODAL = "MODALS/SHOW";
const HIDE_MODAL = "MODALS/HIDE";

export function showModal(name) {
  return {
    type: SHOW_MODAL,
    payload: {
      name,
    },
  };
}

export function hideModal(name) {
  return {
    type: HIDE_MODAL,
    payload: {
      name,
    },
  };
}

// Reducer

const initialState = {
  payment: false,
  expired: false,
  expirationWarning: false,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_MODAL: {
      const { name } = payload;
      if (state[name]) {
        return state;
      }

      return {
        ...state,
        [name]: true,
      };
    }
    case HIDE_MODAL: {
      const { name } = payload;
      if (!state[name]) {
        return state;
      }

      return {
        ...state,
        [name]: false,
      };
    }
    default:
      return state;
  }
};
