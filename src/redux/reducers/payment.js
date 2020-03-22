import sleep from "../../utils/sleep";

// Actions

const PAY = "PAYMENT/PAY/PAY";

export function pay() {
  const payOnServer = async () => {
    await sleep(2000);
  };

  return {
    type: PAY,
    payload: payOnServer(),
    meta: {
      loader: {
        ignore: true,
      },
    },
  };
}

// Reducer

const initialState = {
  items: [],
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
};
