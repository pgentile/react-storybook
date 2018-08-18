import React from "react";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react";

import PaymentContainerConnected from "./PaymentContainerConnected";
import { createDefaultStore } from "./redux/store";

import { loadItems } from "./redux/reducers/payment";

storiesOf("Payment / PaymentContainerConnected", module)
  .addDecorator(story => {
    const store = createDefaultStore();

    store.dispatch(
      loadItems([
        {
          id: "billets",
          label: "Vos billets",
          price: {
            value: 55.6,
            currency: "€"
          }
        }
      ])
    );

    return <Provider store={store}>{story()}</Provider>;
  })
  .add("main", () => {
    return <PaymentContainerConnected />;
  });
