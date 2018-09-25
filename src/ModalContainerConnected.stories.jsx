import React from "react";
import { Provider } from "react-redux";
import { storiesOf } from "@storybook/react";

import ModalContainerConnected from "./ModalContainerConnected";
import { createDefaultStore } from "./redux/store";
import { showModal } from "./redux/reducers/modals";

storiesOf("ModalContainerConnected", module)
  .addDecorator(story => {
    const store = createDefaultStore();

    setTimeout(() => {
      store.dispatch(showModal("expirationWarning"));
    }, 10 * 1000);

    setTimeout(() => {
      store.dispatch(showModal("expirationWarning"));
    }, 20 * 1000);

    setTimeout(() => {
      store.dispatch(showModal("expired"));
    }, 30 * 1000);

    return <Provider store={store}>{story()}</Provider>;
  })
  .add("main", () => {
    return <ModalContainerConnected />;
  });
