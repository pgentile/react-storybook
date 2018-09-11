import React from "react";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react";

import OrderEditorConnected from "./OrderEditorConnected";
import { createDefaultStore } from "../redux/store";
import { TICKET_TYPE, loadItems } from "../redux/reducers/payment";

storiesOf("Payment / OrderEditorConnected", module)
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

    return <Provider store={store}>{story()}</Provider>;
  })
  .add("main", () => {
    return <OrderEditorConnected />;
  });
