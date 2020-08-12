import React from "react";
import { Provider } from "react-redux";

import PaymentFormConnected from "./PaymentFormConnected";
import { createDefaultStore } from "../redux/store";
import { TICKET_TYPE, loadItems } from "../redux/reducers/order";
import { loadCards } from "../redux/reducers/connectedUser";

export default {
  title: "Payment / PaymentFormConnected",
  component: PaymentFormConnected,
  decorators: [
    (story) => {
      const store = createDefaultStore();

      store.dispatch(
        loadItems([
          {
            id: "billets",
            type: TICKET_TYPE,
            label: "Vos billets",
            price: {
              value: 55.6,
              currency: "EUR",
            },
          },
        ])
      );

      store.dispatch(
        loadCards([
          {
            id: "1",
            brand: "visa",
            maskedNumber: "#### #### #### 1111",
            expirationDate: "2031-07",
          },
        ])
      );

      return <Provider store={store}>{story()}</Provider>;
    },
  ],
};

export const main = () => <PaymentFormConnected />;
