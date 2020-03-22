import createScope from "./createScope";

// Selectors

const scope = createScope((state) => state.connectedUser);

export const selectCards = scope((connectedUser) => connectedUser.cards);

// Actions

const LOAD_CARDS = "CONNECTED_USER/LOAD_CARDS";

export function loadCards(cards) {
  return {
    type: LOAD_CARDS,
    payload: Promise.resolve({
      cards,
    }),
  };
}

// Reducer

const initialState = {
  cards: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case `${LOAD_CARDS}_FULFILLED`: {
      const { cards } = payload;
      return {
        ...state,
        cards,
      };
    }
    default:
      return state;
  }
};
