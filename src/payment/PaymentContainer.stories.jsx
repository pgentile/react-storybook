import React from "react";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react";

import PaymentContainer from "./PaymentContainer";
import { createDefaultStore } from "../redux/store";
import { TICKET_TYPE, loadItems } from "../redux/reducers/payment";
import { loadCards } from "../redux/reducers/connectedUser";

storiesOf("Payment / PaymentContainer", module)
  .addDecorator(story => {
    const store = createDefaultStore();

    store.dispatch(
      loadItems([
        {
          id: "billets",
          type: TICKET_TYPE,
          label: "Vos billets",
          price: {
            value: 55.6,
            currency: "€"
          }
        }
      ])
    );

    store.dispatch(
      loadCards([
        {
          id: "1",
          brand: "visa",
          maskedNumber: "#### #### #### 1111",
          expirationDate: "2031-07"
        },
        {
          id: "2",
          brand: "mastercard",
          maskedNumber: "#### #### #### 1113",
          expirationDate: "2029-01"
        },
        {
          id: "3",
          brand: "maestro",
          maskedNumber: "#### #### #### 1113",
          expirationDate: "2029-01"
        }
      ])
    );

    return <Provider store={store}>{story()}</Provider>;
  })
  .add("main", () => {
    return <PaymentContainer />;
  });
